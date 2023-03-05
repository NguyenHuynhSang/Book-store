import { useContext, useState } from 'react';
import { Badge, Dropdown, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, redirect } from 'react-router-dom';
import Store from '../../Store';
import LoginForm from '../Login';
import CartModal from './CartModal';

const Header = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, loggedUser } = state;
  const [isShowLoginForm, setShowLoginForm] = useState(false);

  const [isShowCartForm, setShowCartForm] = useState(false);

  const LogoutHandler = () => {
    console.log('user log out');
    ctxDispatch({ type: 'USER_LOGOUT' });
  };

  function showCart(e) {
    e.preventDefault();
    //trigger when click on parent element only
    if (e.target === e.currentTarget) {
      setShowCartForm(!isShowCartForm);
    }
  }

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
            <label htmlFor="search-box" className="fas fa-search"></label>
          </form>

          <div className="icons">
            <div id="search-btn" className="fas fa-search"></div>
            <div
              onClick={(e) => showCart(e)}
              className="fas fa-shopping-cart"
              id="shopping-cart"
            >
              <Badge
                onClick={(e) => showCart(e)}
                id="quantityBadge"
                className="quantityBadge"
                pill
                bg="danger"
              >
                {cart.Items.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
              {isShowCartForm && <CartModal></CartModal>}
            </div>
            <div
              id="login-btn"
              onClick={() => setShowLoginForm(!isShowLoginForm)}
              className="fas fa-user"
            ></div>
            {loggedUser ? (
              <div>
                <NavDropdown
                  title={loggedUser.username}
                  id="basic-nav-dropdown"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      {' '}
                      <i class="fa-solid fa-bars"></i>User Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/">
                    <NavDropdown.Item onClick={LogoutHandler}>
                      {' '}
                      <i class="fa-solid fa-right-from-bracket"></i>Logout
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </div>
            ) : (
              ''
            )}
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
      {isShowLoginForm && !loggedUser ? (
        <LoginForm setLogin={setShowLoginForm} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Header;
