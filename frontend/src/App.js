import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import BookPage from './Pages/BookPage';
import HomePage from './Pages/HomePage';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, Nav } from 'react-bootstrap';
import { useContext } from 'react';
import Store from './CartStore';
import CartPage from './Pages/CartPage';
function App() {
  const { state } = useContext(Store);

  const { cart } = state;
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Books</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.Items.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.Items.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/cart" element={<CartPage />}></Route>
              <Route path="/book/:slug" element={<BookPage />}></Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">footer</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
