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
import FilterPage from '../Pages/FilterPage';
import ProtectedRoute from '../Components/ProtectedRoute';
import UserListPage from '../Pages/adminArea/UserListPage';
import {
  URL_BOOK_BY_SLUG_PAGE,
  URL_CART_PAGE,
  URL_CHECKOUT_PAGE,
  URL_HOME_PAGE,
  URL_ORDER_BY_ID_PAGE,
  URL_ORDER_HISTORY_PAGE,
  URL_PLACEORDER_PAGE,
  URL_SEARCH_DEFAULT_PAGE,
  URL_SIGNIN_PAGE,
  URL_SIGNUP_PAGE,
  URL_USER_PAGE,
  URL_USER_LIST_PAGE,
  URL_BOOK_PRODUCT_PAGE,
  URL_SELLER_PRODUCTS,
  URL_SELLER_ORDERS,
  URL_SELLER_ADD_PRODUCT,
} from './UrlMapper';
import BookProductPage from '../Pages/adminArea/BookProductPage';
import SellerRoute from '../Components/SellerRoute';
import CreateProductPage from '../Pages/adminArea/CreateProductPage';

const RouteController = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route path={URL_HOME_PAGE} element={<HomePage />}></Route>
        <Route path={URL_CART_PAGE} element={<CartPage />}></Route>
        <Route path={URL_SIGNIN_PAGE} element={<Signin />}></Route>
        <Route path={URL_SIGNUP_PAGE} element={<SignUpPage />}></Route>

        <Route path={URL_PLACEORDER_PAGE} element={<PlaceOrderPage />}></Route>
        <Route path={URL_CHECKOUT_PAGE} element={<CheckOutPage />}></Route>
        <Route
          path={URL_USER_PAGE}
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path={URL_BOOK_PRODUCT_PAGE}
          element={
            <ProtectedRoute>
              <BookProductPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path={URL_USER_LIST_PAGE}
          element={
            <ProtectedRoute>
              <UserListPage />
            </ProtectedRoute>
          }
        ></Route>

        <Route path={URL_BOOK_BY_SLUG_PAGE} element={<BookPage />}></Route>
        <Route
          path={URL_ORDER_BY_ID_PAGE}
          element={
            <ProtectedRoute>
              <OrderDetailPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path={URL_ORDER_HISTORY_PAGE}
          element={
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path={URL_SELLER_PRODUCTS}
          element={
            <SellerRoute>
              <BookProductPage />
            </SellerRoute>
          }
        ></Route>

        <Route
          path={URL_SELLER_ORDERS}
          element={
            <SellerRoute>
              <OrderHistoryPage />
            </SellerRoute>
          }
        ></Route>
        <Route
          path={URL_SELLER_ADD_PRODUCT}
          element={
            <SellerRoute>
              <CreateProductPage />
            </SellerRoute>
          }
        ></Route>
        <Route path={URL_SEARCH_DEFAULT_PAGE} element={<FilterPage />}></Route>
      </Routes>
    </div>
  );
};
export default RouteController;
