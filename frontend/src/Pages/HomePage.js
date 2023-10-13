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
import {
  API_BOOKS_BASE,
  API_BOOK_LIST,
  FETCH_BOOK_LIST_FAIL,
  FETCH_BOOK_LIST_REQ,
  FETCH_BOOK_LIST_SUCCESS,
  bookListReducer,
} from '../Reducers/BookReducer';

function HomePage() {
  const [{ loading, error, books }, dispatch] = useReducer(bookListReducer, {
    books: [],
    loading: true,
    error: '',
  });

  // const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: FETCH_BOOK_LIST_REQ });
      try {
        const result = await axios.get(API_BOOKS_BASE);
        dispatch({ type: FETCH_BOOK_LIST_SUCCESS, payload: result.data });
        // setBooks(result.data);
      } catch (err) {
        dispatch({ type: FETCH_BOOK_LIST_FAIL, payload: err.message });
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
