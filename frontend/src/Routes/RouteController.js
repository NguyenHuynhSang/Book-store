import { Route, Routes } from 'react-router-dom';
import BookPage from '../Pages/BookPage';
import CartPage from '../Pages/CartPage';
import CheckOutPage from '../Pages/CheckOutPage';
import HomePage from '../Pages/HomePage';
import Signin from '../Pages/SignInPage';
import SignUpPage from '../Pages/SignUpPage';
import PlaceOrderPage from '../Pages/PlaceOrderPage';
import OrderHistoryPage from '../Pages/0rderHistoryPage';
import UserProfilePage from '../Pages/UserProfilePage';
import OrderDetailPage from '../Pages/OrderDetailPage';

const RouteController = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>

        <Route path="/placeorder" element={<PlaceOrderPage />}></Route>
        <Route path="/Checkout" element={<CheckOutPage />}></Route>
        <Route path="/user" element={<UserProfilePage />}></Route>
        <Route path="/book/:slug" element={<BookPage />}></Route>
        <Route path="/order/:_id" element={<OrderDetailPage />}></Route>
        <Route
          path="/order/orderHistory"
          element={<OrderHistoryPage />}
        ></Route>
      </Routes>
    </div>
  );
};
export default RouteController;
