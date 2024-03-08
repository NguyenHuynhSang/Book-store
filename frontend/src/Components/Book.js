import axios from 'axios';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Store from '../Store';
import Rating from './Rating';
import { API_BOOK_BY_ID } from '../Reducers/BookReducer';
import { LINK_BOOK_BY_SLUG } from '../Routes/UrlMapper';
import { moneyFormat } from '../utils';

function Book(props) {
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

    const { data } = await axios.get(API_BOOK_BY_ID(item._id));
    if (data.countInStock < quantity) {
      window.alert('Out of Stock!!! Only ' + data.countInStock + ' available');
    } else {
      ctxDispatch({ type: 'ADD_ITEM', payload: { ...item, quantity } });
      //navigate('/cart');
    }
  };
  return (
    <Card className="book d-flex" id="book-card">
      <Link to={LINK_BOOK_BY_SLUG(book.slug)}>
        <img src={book.image} className="cart-img-top" alt={book.name}></img>
      </Link>
      <Card.Body>
        <Rating rating={book.rating} numReviews={book.numReviews}></Rating>
        <Card.Title>{book.name}</Card.Title>
        <Card.Text className="text-price-base">
          {moneyFormat(book.price)}
        </Card.Text>
      </Card.Body>
      <Button
        style={{ width: '100%', margin: 'auto' }}
        className="btn-buy"
        disabled={book.countInStock <= 0}
        onClick={() => addToCart(book)}
      >
        Mua
      </Button>
    </Card>
  );
}

export default Book;
