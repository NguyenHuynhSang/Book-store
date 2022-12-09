import { BrowserRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import RouteController from './Routes/RouteController';
import MainNav from './Components/Header/MainNav';
import Header from './Components/Header/Index';
function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        {/* <header>
          <MainNav />
        </header> */}
        <Header />
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
