import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
      {' '}
      <h1>Top Books</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.slug}>
            <Link to={`/book/${book.slug}`}>
              <img src={book.image} alt={book.name}></img>
            </Link>
            <div className="book-infor">
              <p>{book.name}</p>
              <p>VND {book.price}</p>
            </div>
            <button className="btn-buy">Mua</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
