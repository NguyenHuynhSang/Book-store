import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Store from '../../Store';
import Message from '../Message';
import { moneyFormat } from '../../utils';
const CartModal = (props) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { Items },
  } = state;

  const updateCart = async (item, quantity) => {
    const { data } = await axios.get(`/api/books/${item._id}`);
    console.log(quantity);
    if (quantity === 0) {
      removeItems(item);
      return;
    }
    if (data.countInStock < quantity) {
      window.alert('Out of Stock!!! Only ' + data.countInStock + ' available');
    } else ctxDispatch({ type: 'ADD_ITEM', payload: { ...item, quantity } });
    //navigate('/cart');
  };

  const removeItems = (item) => {
    ctxDispatch({ type: 'REMOVE_ITEM', payload: item });
    console.log(Items);
  };
  return (
    <div className="cart-box">
      <div className="items">
        {Items.length <= 0 ? (
          <Message>Cart is empty</Message>
        ) : (
          Items.map((x) => (
            <div className="item" key={x._id}>
              <img src={x.image} alt=""></img>
              <div className="info">
                <h3>{x.name}</h3>
                <div className="quantity-box">
                  <i
                    className="fa fa-minus-circle"
                    onClick={() => updateCart(x, --x.quantity)}
                  ></i>
                  <span className="quantity"> {x.quantity} </span>{' '}
                  <i
                    className="fa fa-plus-circle"
                    onClick={() => updateCart(x, ++x.quantity)}
                  ></i>
                </div>

                <p>
                  Price:{' '}
                  <span className="text-price-base text-price-card-modal">
                    {moneyFormat(x.price * x.quantity)}
                  </span>
                </p>
              </div>
              <button
                type="button"
                className="fa fa-remove"
                id="remove-item"
                onClick={() => removeItems(x)}
              ></button>
            </div>
          ))
        )}
      </div>
      <div className="summary">
        <p>
          Totals:{' '}
          <span className="text-price-base text-price-card-modal">
            {moneyFormat(Items.reduce((a, c) => a + c.price * c.quantity, 0))}{' '}
          </span>
        </p>

        <Link to="/cart" variant="success" className="btn btn-success">
          Thanh Toan{' '}
        </Link>
      </div>
    </div>
  );
};
export default CartModal;
