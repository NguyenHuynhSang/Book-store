import React, { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GetError from '../utils';
import axios, { Axios } from 'axios';

const reducer = (action, state) => {
  switch (action.type) {
    case 'FETCH_REQ':
      return { ...state, loading: true };
      break;
    case 'FETCH_SUCC': {
      return {
        ...state,
        books: action.payload.books,
        page: action.payload.page,
        pages: action.payload.pages,
        countBooks: action.payload.countBooks,
        loading: false,
      };
    }
    case 'FETCH_FAIL': {
      return { ...state, loading: false, error: action.payload };
    }

    default:
      break;
  }
};
export default function FilterPage() {
  const navigate = useNavigate();
  const { filter } = useLocation();
  const sp = new URLSearchParams(filter);
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('query') || 'all';
  const order = sp.get('order') || 'latest';
  // pagination
  const page = sp.get('page') || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Axios.get(
          `/api/books/search?page=${page}&query=${query}&category=${category}&price=${price}}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCC', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: GetError(err),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

  const [{ loading, error, books, pages, countBooks }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: '',
    }
  );
  const [caterories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get('/api/books/categories');
        setCategories(data);
      } catch (error) {}
    };
  }, []);

  return <div>FilterPage</div>;
}
