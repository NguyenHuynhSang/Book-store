import { parsePath, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import Rating from '../Components/Rating';
import { Helmet } from 'react-helmet-async';
import Loading from '../Components/Loading';
import Message from '../Components/Message';

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

function BookScreen() {
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
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  return loading ? (
    <Loading></Loading>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className="image-large" src={book.image} alt={book.name}></img>
        </Col>
        <Col md={3}>
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
            <ListGroup.Item>Price: {book.price}</ListGroup.Item>
            <ListGroup.Item>
              <p> {book.des}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
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
                      <Button variant="primary">Add to Cart</Button>
                    </div>
                  </ListGroup.Item>
                ) : (
                  ''
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default BookScreen;
