import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import BookScreen from './screens/BookScreen';
import HomeScreen from './screens/HomeScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Books</Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
          <Link to="/">Book</Link>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />}></Route>
              <Route path="/book/:slug" element={<BookScreen />}></Route>
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
