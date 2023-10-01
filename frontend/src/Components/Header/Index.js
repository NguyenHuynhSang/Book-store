import { useContext, useEffect, useState } from 'react';
import { Badge, Dropdown, DropdownButton, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, redirect } from 'react-router-dom';
import Store from '../../Store';
import LoginForm from '../Login';
import CartModal from './CartModal';
import SearchBox from './SearchBox';
import axios from 'axios';
import GetError from '../../utils';

const Header = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, loggedUser } = state;
  const [isShowLoginForm, setShowLoginForm] = useState(false);

  const [isShowCartForm, setShowCartForm] = useState(false);
  const [categories, setCategories] = useState([]);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/books/categories');
        console.log(data);
        setCategories(data);
      } catch (error) {
        GetError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <header className="header">
        <div className="header-1">
          <Link to="/" className="logo">
            <i className="fas fa-book"></i>Book
          </Link>
          <SearchBox></SearchBox>

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
              loggedUser.role === 'admin' ? (
                <div>
                  <NavDropdown
                    title={'Admin: ' + loggedUser.username}
                    id="admin-nav-dropdown"
                  >
                    <div className="user-dropdown-box">
                      <LinkContainer to="/dashboard">
                        <NavDropdown.Item>
                          {' '}
                          <i class="fa-solid fa-bars me-3 mb-2"></i>Admin
                          Dashboard
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/order/orderHistory">
                        <NavDropdown.Item>
                          {' '}
                          <i class="fa-solid fa-user me-3 mb-2"></i>
                          Admin Profile
                        </NavDropdown.Item>
                      </LinkContainer>
                      <hr className="m-2"></hr>
                      <LinkContainer to="/">
                        <NavDropdown.Item onClick={LogoutHandler}>
                          <i class="fa-solid fa-right-from-bracket me-3"></i>
                          Logout
                        </NavDropdown.Item>
                      </LinkContainer>
                    </div>
                  </NavDropdown>
                </div>
              ) : (
                <div>
                  <NavDropdown
                    title={loggedUser.username}
                    id="basic-nav-dropdown"
                  >
                    <div className="user-dropdown-box">
                      <LinkContainer to="/user">
                        <NavDropdown.Item>
                          <i class="fa-solid fa-bars me-3 mb-2"></i>User Profile
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/order/orderHistory">
                        <NavDropdown.Item>
                          <i class="fa-solid fa-right-from-bracket me-3 "></i>
                          OrderHistory
                        </NavDropdown.Item>
                      </LinkContainer>
                      <hr className="m-2"></hr>
                      <LinkContainer to="/">
                        <NavDropdown.Item onClick={LogoutHandler}>
                          <i class="fa-solid fa-right-from-bracket me-3"></i>
                          Logout
                        </NavDropdown.Item>
                      </LinkContainer>
                    </div>
                  </NavDropdown>
                </div>
              )
            ) : (
              ''
            )}
          </div>
        </div>

        <div className="header-2">
          <nav className="navbar">
            <Link to="/" target="_self">
              Home
            </Link>
            <Link className="link-style" to="" id="categories-dropdown-btn">
              Category <i className="fa fa-triangle">A</i>
              <ul className="categories-dropdown">
                <li>All </li>
                {categories.map((x, index) => (
                  <li title={x}>{x} </li>
                ))}
              </ul>
            </Link>

            <Link to="/search" target="_self">
              Filter
            </Link>
            <Link to="/" target="_self">
              Blog
            </Link>
            <Link to="/" target="_self">
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
