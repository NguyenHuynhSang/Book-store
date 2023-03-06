import { Route, Routes } from 'react-router-dom';
import BookPage from '../Pages/BookPage';
import CartPage from '../Pages/CartPage';
import CheckOutPage from '../Pages/CheckOutPage';
import HomePage from '../Pages/HomePage';
import Signin from '../Pages/SignInPage';

const RouteController = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/Checkout" element={<CheckOutPage />}></Route>
      <Route path="/book/:slug" element={<BookPage />}></Route>
    </Routes>
  );
};
export default RouteController;
