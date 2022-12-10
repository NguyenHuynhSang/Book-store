import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Store from '../../CartStore';
import Message from '../Message';

const CartModal = (props) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { Items },
  } = state;

  const updateCart = async (item, quantity) => {
    const { data } = await axios.get(`api/books/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Out of Stock!!! Only ' + data.countInStock + ' available');
    }
    ctxDispatch({ type: 'ADD_ITEM', payload: { ...item, quantity } });
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
          <h2>Khong co sp</h2>
        ) : (
          Items.map((x) => (
            <div className="item">
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

                <p> Gia: {x.price}</p>
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
          Tong tien: <span>2 000 000 </span>
        </p>

        <Link to="/cart" className="btn">
          Thanh Toan{' '}
        </Link>
      </div>
    </div>
  );
};
export default CartModal;
