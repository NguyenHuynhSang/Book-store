import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Store from '../../CartStore';
import LoginForm from '../Login';
import CartPopup from './CartPopup';

const Header = () => {
  const { state } = useContext(Store);
  const { cart } = state;
  const [isShowLoginForm, setShowLoginForm] = useState(false);
  const [isShowCartForm, setShowCartForm] = useState(false);
  return (
    <div>
      <header className="header">
        <div className="header-1">
          <Link to="/" className="logo">
            <i className="fas fa-book"></i>Book
          </Link>
          <form action="" className="search-form">
            <input
              type="search"
              name=""
              id="search-box"
              placeholder="tim kiem"
            />
            <label for="search-box" className="fas fa-search"></label>
          </form>

          <div className="icons">
            <div id="search-btn" className="fas fa-search"></div>
            <div
              href="/"
              onClick={() => setShowCartForm(true)}
              className="fas fa-shopping-cart"
              id="shopping-cart"
            >
              {isShowCartForm && <CartPopup></CartPopup>}
            </div>
            <div
              id="login-btn"
              onClick={() => setShowLoginForm(true)}
              className="fas fa-user"
            ></div>
          </div>
        </div>

        <div className="header-2">
          <nav className="navbar">
            <Link to="/" target="_blank">
              Home
            </Link>
            <Link to="/" target="_blank">
              Hot
            </Link>
            <Link to="/" target="_blank">
              Incomming
            </Link>
            <Link to="/" target="_blank">
              Blog
            </Link>
            <Link to="/" target="_blank">
              About Us
            </Link>
          </nav>
        </div>
      </header>
      {isShowLoginForm && <LoginForm />}
    </div>
  );
};

export default Header;
