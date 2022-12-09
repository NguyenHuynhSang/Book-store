import { Link } from 'react-router-dom';

const CartPopup = () => {
  return (
    <div className="cart-box">
      <div className="items">
        <div className="item">
          <img src="./assets/image/b1.webp" alt=""></img>
          <div className="info">
            <h3> All the light we cant see</h3>
            <div className="quantity-box">
              <i className="fa fa-plus-circle"></i>
              <span className="quantity"> 1 </span>{' '}
              <i className="fa fa-minus-circle"></i>
            </div>

            <p> Gia: 200000</p>
          </div>
          <button
            type="button"
            className="fa fa-remove"
            id="remove-item"
          ></button>
        </div>
        <div className="item">
          <img src="./assets/image/b2.webp" alt=""></img>
          <div className="info">
            <h3> TEn sach sadsadsadsa</h3>
            <div className="quantity-box">
              <i className="fa fa-plus-circle"></i>
              <span className="quantity"> 1 </span>{' '}
              <i className="fa fa-minus-circle"></i>
            </div>
            <p> Gia: 200000</p>
          </div>
          <button
            type="button"
            className="fa fa-remove"
            id="remove-item"
          ></button>
        </div>
        <div className="item">
          <img src="./assets/image/b3.webp" alt=""></img>
          <div className="info">
            <h3>The Shinning</h3>
            <div className="quantity-box">
              <i className="fa fa-plus-circle"></i>
              <span className="quantity"> 1 </span>{' '}
              <i className="fa fa-minus-circle"></i>
            </div>
            <p> Gia: 200000</p>
          </div>
          <button
            type="button"
            className="fa fa-remove"
            id="remove-item"
          ></button>
        </div>
        <div className="item">
          <img src="./assets/image/b4.webp" alt=""></img>
          <div className="info">
            <h3> Graphic design</h3>
            <div className="quantity-box">
              <i className="fa fa-plus-circle"></i>
              <span className="quantity"> 1 </span>{' '}
              <i className="fa fa-minus-circle"></i>
            </div>
            <p> Gia: 200000</p>
          </div>
          <button
            type="button"
            className="fa fa-remove"
            id="remove-item"
          ></button>
        </div>
        <div className="item">
          <img src="./assets/image/b5.webp" alt=""></img>
          <div className="info">
            <h3>History of Art</h3>
            <div className="quantity-box">
              <i className="fa fa-plus-circle"></i>
              <span className="quantity"> 1 </span>{' '}
              <i className="fa fa-minus-circle"></i>
            </div>
            <p> Gia: 200000</p>
          </div>

          <button
            type="button"
            className="fa fa-remove"
            id="remove-item"
          ></button>
        </div>
      </div>
      <div className="summary">
        <p>
          Tong tien: <span>2 000 000 </span>
        </p>
        <Link to="/" className="btn">
          Thanh Toan{' '}
        </Link>
      </div>
    </div>
  );
};
export default CartPopup;
