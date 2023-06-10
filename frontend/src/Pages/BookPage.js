import { useFetcher, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import Rating from '../Components/Rating';
import { Helmet } from 'react-helmet-async';
import Loading from '../Components/Loading';
import Message from '../Components/Message';
import GetError from '../utils';
import Store from '../Store';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQ':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, book: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function BookPage() {
  const navigate = useNavigate();
  const urlParam = useParams();
  const { slug } = urlParam;

  const [{ loading, error, book }, dispatch] = useReducer(reducer, {
    book: [],
    loading: true,
    error: '',
  });

  // const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQ' });
      try {
        const result = await axios.get(`/api/books/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        // setBooks(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: GetError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCart = async () => {
    const existItem = cart.Items.find((x) => x._id === book._id);
    let quantity = 1;
    if (existItem) {
      quantity = ++existItem.quantity;
    }

    const { data } = await axios.get(`/api/books/${book._id}`);

    if (data.countInStock < quantity) {
      window.alert('Out of Stock!!! Only ' + data.countInStock + ' available');
    }
    ctxDispatch({ type: 'ADD_ITEM', payload: { ...book, quantity } });
    //navigate('/cart');
  };

  return loading ? (
    <Loading></Loading>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div style={{ margin: '5rem 15rem' }}>
      <Breadcrumb>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
          Library
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col md={5}>
          <Image
            className="image-large"
            src={book.image}
            alt={book.name}
            style={{ width: '55rem', margin: 'auto', display: 'inline' }}
          ></Image>
        </Col>
        <Col md={7}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{book.name}</title>
              </Helmet>
              <h1>{book.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={book.rating}
                numReviews={book.numReviews}
              ></Rating>
            </ListGroup.Item>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>{book.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {book.countInStock > 0 ? (
                          <Badge bg="success">Available</Badge>
                        ) : (
                          <Badge bg="dagger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {book.countInStock > 0 ? (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button onClick={() => addToCart()} variant="primary">
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ) : (
                    ''
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
            <ListGroup.Item>
              <p> {book.des}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={2}></Col>
      </Row>
    </div>
  );
}
export default BookPage;
