export const URL_HOME_PAGE = '/';
export const URL_CART_PAGE = '/cart';
export const URL_SIGNIN_PAGE = '/signin';
export const URL_SIGNUP_PAGE = '/signup';
export const URL_PLACEORDER_PAGE = '/placeorder';
export const URL_CHECKOUT_PAGE = '/checkout';
export const URL_USER_PAGE = '/user';
export const URL_USER_LIST_PAGE = '/user/list';

export const URL_ORDER_HISTORY_PAGE = '/order/orderHistory';
export const URL_SEARCH_DEFAULT_PAGE = '/search';

export const URL_BOOK_BY_SLUG_PAGE = '/book/:slug';
export const URL_ORDER_BY_ID_PAGE = '/order/:_id';
export const LINK_BOOK_BY_SLUG = (slug) => {
  return `/book/${slug}`;
};
