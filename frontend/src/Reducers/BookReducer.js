export const FETCH_BOOK_REQ = 'FETCH_BOOK_REQ';
export const FETCH_BOOK_SUCCESS = 'FETCH_BOOK_SUCCESS';
export const FETCH_BOOK_FAIL = 'FETCH_BOOK_FAIL';

export const FETCH_BOOK_LIST_REQ = 'FETCH_BOOK_LIST_REQ';
export const FETCH_BOOK_LIST_SUCCESS = 'FETCH_BOOK_LIST_SUCCESS';
export const FETCH_BOOK_LIST_FAIL = 'FETCH_BOOK_LIST_FAIL';

export const API_BOOKS_BASE = '/api/books';

export const API_BOOK_BY_SLUG = (slug) => {
  return API_BOOKS_BASE + `/slug/${slug}`;
};

export const API_BOOK_BY_ID = (_id) => {
  return API_BOOKS_BASE + `/${_id}`;
};

export const bookReducer = (state, action) => {
  switch (action.type) {
    case FETCH_BOOK_REQ:
      return { ...state, loading: true };
    case FETCH_BOOK_SUCCESS:
      return { ...state, book: action.payload, loading: false };
    case FETCH_BOOK_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookListReducer = (state, action) => {
  switch (action.type) {
    case FETCH_BOOK_LIST_REQ:
      return { ...state, loading: true };
    case FETCH_BOOK_LIST_SUCCESS:
      return { ...state, books: action.payload, loading: false };
    case FETCH_BOOK_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
