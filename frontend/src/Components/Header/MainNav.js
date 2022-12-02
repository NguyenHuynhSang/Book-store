import { useContext } from 'react';
import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Store from '../../CartStore';

const MainNav = () => {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
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
  );
};
export default MainNav;
