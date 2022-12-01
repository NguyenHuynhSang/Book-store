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
import RouteController from './Routes/RouteController';
import MainNav from './Components/MainNav';
function App() {
  const { state } = useContext(Store);

  const { cart } = state;
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <MainNav />
        </header>
        <main>
          <Container className="mt-3">
            <RouteController />
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
