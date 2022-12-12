import { BrowserRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'react-toastify/dist/ReactToastify.css';
import RouteController from './Routes/RouteController';
import MainNav from './Components/Header/MainNav';
import Header from './Components/Header/Index';

import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        {/* <header>
          <MainNav />
        </header> */}
        <Header />
        <main>
          <RouteController />
        </main>
        <footer>
          <div className="text-center">footer</div>
        </footer>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
