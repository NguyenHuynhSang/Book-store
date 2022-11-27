import { useEffect, useReducer, useState } from 'react';

import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Book from '../Components/Book';
const reducer = (state, action) => {
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

function HomeScreen() {
  const [{ loading, error, books }, dispatch] = useReducer(reducer, {
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

  return (
    <div>
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
    </div>
  );
}

export default HomeScreen;
