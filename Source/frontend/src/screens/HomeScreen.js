import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function HomeScreen() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('api/books');
      setBooks(result.data);
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
