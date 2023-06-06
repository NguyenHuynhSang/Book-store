import { useEffect, useReducer } from 'react';

import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Book from '../Components/Book';
import { Helmet } from 'react-helmet-async';
import Loading from '../Components/Loading';
import Message from '../Components/Message';
import Icons from '../Components/Home/Icons';
import Slider from '../Components/Home/Slider';
import style from '../Asset/css/Home.css';
const userReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQ':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, books: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomePage() {
  const [{ loading, error, books }, dispatch] = useReducer(userReducer, {
    books: [],
    loading: true,
    error: '',
  });

  // const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQ' });
      try {
        const result = await axios.get('api/books');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        // setBooks(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <Helmet>
        <title>LoveBook</title>
      </Helmet>

      <Slider></Slider>
      <section className="top-book-container">
        <h1>Top Books</h1>
        <div className="books">
          <Row>
            {books.map((book) => (
              <Col key={book.slug} sm={6} md={4} lg={3} className="mb-3">
                <Book book={book}></Book>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <Icons></Icons>
    </div>
  );
}

export default HomePage;
