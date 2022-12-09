import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Store from '../../CartStore';

const CartPopup = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { Items },
  } = state;

  return (
    <div className="cart-box">
      <div className="items">
        {Items.map((x) => (
          <div className="item">
            <img src={x.image} alt=""></img>
            <div className="info">
              <h3>{x.name}</h3>
              <div className="quantity-box">
                <i className="fa fa-plus-circle"></i>
                <span className="quantity"> {x.quantity} </span>{' '}
                <i className="fa fa-minus-circle"></i>
              </div>

              <p> Gia: {x.price}</p>
            </div>
            <button
              type="button"
              className="fa fa-remove"
              id="remove-item"
            ></button>
          </div>
        ))}
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
export default CartPopup;
