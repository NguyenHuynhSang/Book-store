import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import BookScreen from './screens/BookScreen';
import HomeScreen from './screens/HomeScreen';
function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">Book</Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/book/:slug" element={<BookScreen />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
