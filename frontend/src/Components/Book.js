import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Book(props) {
  const { book } = props;
  return (
    <Card className="book">
      <Link to={`/book/${book.slug}`}>
        <img src={book.image} className="cart-img-top" alt={book.name}></img>
      </Link>
      <Card.Body>
        <Rating rating={book.rating} numReviews={book.numReviews}></Rating>
        <Card.Title>{book.name}</Card.Title>
        <Card.Text>{book.price}</Card.Text>
      </Card.Body>
      <Button className="btn-buy">Mua</Button>
    </Card>
  );
}

export default Book;
