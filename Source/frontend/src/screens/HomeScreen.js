import { Link } from 'react-router-dom';
import data from '../tempdata';

function HomeScreen() {
  return (
    <div>
      {' '}
      <h1>Top Books</h1>
      <div className="books">
        {data.books.map((book) => (
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
