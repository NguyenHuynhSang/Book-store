import { Link, useFetcher, useNavigate, useParams } from 'react-router-dom';
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
import GetError, { formatDate, moneyFormat } from '../utils';
import Store from '../Store';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {
  API_BOOK_BY_ID,
  API_BOOK_BY_SLUG,
  FETCH_BOOK_FAIL,
  FETCH_BOOK_REQ,
  FETCH_BOOK_SUCCESS,
  bookReducer,
} from '../Reducers/BookReducer';
import { URL_SEARCH_DEFAULT_PAGE } from '../Routes/UrlMapper';

function BookPage() {
  const navigate = useNavigate();
  const urlParam = useParams();
  const { slug } = urlParam;
  const checkOut = () => {
    navigate('/checkout');
  };
  const [{ loading, error, book }, dispatch] = useReducer(bookReducer, {
    book: [],
    loading: true,
    error: '',
  });

  // const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: FETCH_BOOK_REQ });
      try {
        const result = await axios.get(API_BOOK_BY_SLUG(slug));
        dispatch({ type: FETCH_BOOK_SUCCESS, payload: result.data });
        // setBooks(result.data);
        console.log(result.data);
      } catch (err) {
        dispatch({ type: FETCH_BOOK_FAIL, payload: GetError(err) });
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

    const { data } = await axios.get(API_BOOK_BY_ID(book._id));

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
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
          Library
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col md={3}>
          <div className="book-detail-thumb-card">
            <Image
              className="book-detail-thumb"
              src={book.image}
              alt={book.name}
            ></Image>
            <hr></hr>
            <h3>Author</h3>
            <div className="authors-card">
              {book.authors.map((x) => (
                <div className="author-card-item">
                  <img className="thumb-img" src={x.avatar}></img>
                  <span className="author-name">{x.name}</span>
                  <hr className="hr-author-item"></hr>
                </div>
              ))}
            </div>
          </div>
          <div></div>
        </Col>
        <Col md={6}>
          <ListGroup variant="flush" className="">
            <ListGroup.Item>
              <Helmet>
                <title>{book.name}</title>
              </Helmet>
              <h1 className="book-card-title">{book.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={book.rating}
                numReviews={book.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Caterory: </b>
              {book.caterories.map((c) => (
                <Link to={URL_SEARCH_DEFAULT_PAGE}>
                  {c !== book.caterories[book.caterories.length - 1]
                    ? c.name + ', '
                    : c.name + '.'}
                </Link>
              ))}
            </ListGroup.Item>
            <ListGroup.Item>
              {' '}
              <hr></hr>
            </ListGroup.Item>

            <ListGroup.Item>
              <b className="book-detail-description">Description</b>
              <div className="book-detail-des-box">
                <p className="book-detail-des-context"> {book.description}</p>
              </div>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            {' '}
            <hr></hr>
          </ListGroup.Item>

          <section className="book-icons-container">
            <div className="icon">
              <i className="fas fa-book"></i>
              <div className="content">
                <h4>Print length</h4>
                <p>{book.numPage} pages</p>
              </div>
            </div>
            <div className="icon">
              <i className="fas fa-language"></i>
              <div className="content">
                <h4>Language</h4>
                <p>{book.language}</p>
              </div>
            </div>
            <div className="icon">
              <i className="fas fa-book"></i>
              <div className="content">
                <h4>Dimensions</h4>
                <p>{book.dimensions}</p>
              </div>
            </div>

            <div className="icon">
              <i className="fas fa-calendar"></i>
              <div className="content">
                <h4>Publication</h4>
                <p>{formatDate(book.publishDate)}</p>
              </div>
            </div>
            <div className="icon">
              <i className="fas fa-building"></i>
              <div className="content">
                <h4>Publisher</h4>
                <p> {book.publisher}</p>
              </div>
            </div>

            <div className="icon">
              <i className="fas fa-qrcode"></i>
              <div className="content">
                <h4>QRCode</h4>
                <p>100 pages</p>
              </div>
            </div>
          </section>
        </Col>
        <Col md={3}>
          <Card className="book-order-card">
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <b>Price:</b>
                    <Col>
                      <span className=" text-price-base book-detail-price">
                        {moneyFormat(book.price)}
                      </span>
                      <i>VND</i>
                    </Col>
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
                      <Button
                        className="mt-3 bg-warning  text-white"
                        onClick={() => checkOut()}
                        variant="primary"
                      >
                        Check Out
                      </Button>
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
      <hr></hr>
      <Row>
        <h3>About the Author</h3>
        <div>
          <span>
            Follow authors to get new release updates, plus improved
            recommendations.
          </span>
          <div className="authors-detail-card">
            {book.authors.map((x) => (
              <div className="author-card">
                <div className="author-thumb">
                  <img className="author-thumb" src={x.avatar}></img>
                </div>
                <div className="author-infor">
                  <span className="author-name">{x.name}</span>
                  <hr className="hr-author-item"></hr>
                  <p>{x.infor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Row>
    </div>
  );
}
export default BookPage;
