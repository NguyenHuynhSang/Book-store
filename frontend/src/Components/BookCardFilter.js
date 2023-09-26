import axios from 'axios';
import { useContext } from 'react';
import { Button, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Store from '../Store';
import Rating from './Rating';

function BookCardFilter(props) {
  const { book } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { Items },
  } = state;
  const addToCart = async (item) => {
    const existItem = Items.find((x) => x._id === book._id);
    let quantity = 1;
    if (existItem) {
      quantity = ++existItem.quantity;
    }

    const { data } = await axios.get(`api/books/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Out of Stock!!! Only ' + data.countInStock + ' available');
    } else {
      ctxDispatch({ type: 'ADD_ITEM', payload: { ...item, quantity } });
      //navigate('/cart');
    }
  };
  return (
    <Card className="book-card ">
      {/* <Link to={`/book/${book.slug}`}>
        <img src={book.image} className="cart-img-top" alt={book.name}></img>
      </Link> */}

      <Card.Img className="book-card-thumb" variant="top" src={book.image} />
      <Card.Body Body>
        <Card.Title className="book-card-title">{book.name}</Card.Title>
        <Card.Text className="book-card-subtitle mb-1">By:Jame</Card.Text>
        <Card.Text className="book-card-subtitle mb-1">
          Category:{' '}
          {book.caterories.map((c) => (
            <Link to="/search">
              {c !== book.caterories[book.caterories.length - 1]
                ? c.name + ', '
                : c.name + '.'}
            </Link>
          ))}
        </Card.Text>
        <Rating rating={book.rating} numReviews={book.numReviews}></Rating>
        <Card.Text>{book.price}</Card.Text>
        <Button
          className="btn-buy"
          disabled={book.countInStock <= 0}
          onClick={() => addToCart(book)}
        >
          Mua
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookCardFilter;
