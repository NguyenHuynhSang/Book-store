import React, { useEffect, useReducer, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GetError from '../utils';
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Col, Row } from 'react-bootstrap';
import Rating from '../Components/Rating';
import MessageBox from '../Components/MessageBox';
import Loading from '../Components/Loading';
import Book from '../Components/Book';
import { LinkContainer } from 'react-router-bootstrap';

const reducer = (state, action) => {
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

const prices = [
  {
    name: '1-100.000',
    value: '1-100000',
  },
  {
    name: '100.000---up',
    value: '100000-1000000',
  },
];

export const ratings = [
  {
    name: '4 stars and up',
    value: 4,
  },
  {
    name: '3 stars and up',
    value: 3,
  },
  {
    name: '2 stars and up',
    value: 2,
  },
  {
    name: '1 stars and up',
    value: 1,
  },
];
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

  const [{ loading, error, books, pages, countBooks }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: '',
    }
  );
  const [caterories, setCategories] = useState([]);
  useEffect(() => {
    console.log('fetch books');
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/books/search?page=${page}&query=${query}&category=${category}&price=${price}}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCC', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: GetError(err),
        });
        console.log(GetError(err));
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get('/api/books/categories');
        setCategories(data);
        console.log('ab' + data);
      } catch (error) {
        toast.error(GetError(error));
      }
    };
    fetchCategory();
    console.log('fetch');
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const filterOrder = filter.order || order;
    return `searchpage=${filterPage}&query=${filterQuery}&category=${filterCategory}&price=${filterPrice}}&rating=${filterRating}&order=${filterOrder}`;
  };
  return (
    <div>
      <Helmet>
        <title>Books filter</title>
      </Helmet>

      <Row>
        <Col md={3}>
          <h3>Category</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={category === 'all' ? 'text-bold' : ''}
                  to={getFilterUrl({ category: 'all' })}
                >
                  Any
                </Link>
              </li>
              {caterories.map((c) => (
                <li>
                  <Link
                    className={category === c ? 'text-bold' : ''}
                    to={getFilterUrl({ category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
              ;
            </ul>
          </div>
          <h3>Price</h3>
          <div>
            <ul>
              {prices.map((c) => (
                <li>
                  <Link
                    className={price === c ? 'text-bold' : ''}
                    to={getFilterUrl({ price: c })}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              ;
            </ul>
          </div>

          <h3>Rating</h3>
          <div>
            <ul>
              {ratings.map((c) => (
                <li>
                  <Link
                    className={rating === c ? 'text-bold' : ''}
                    to={getFilterUrl({ rating: c })}
                  >
                    <Rating caption={' & up'} rating={c.rating}></Rating>
                  </Link>
                </li>
              ))}
              ;
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <Loading></Loading>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content=between mb-3">
                <Col md={6}>
                  <div>
                    {countBooks === 0 ? 'No' : countBooks} Results
                    {query !== 'all' && ' : ' + query}
                    {category !== 'all' && ' : ' + category}
                    {price !== 'all' && ' : Price ' + price}
                    {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                    {query !== 'all' ||
                    category !== 'all' ||
                    rating !== 'all' ||
                    price !== 'all' ? (
                      <Button
                        variant="light"
                        onClick={() => navigate('/search')}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="latest">Latest books</option>
                  </select>
                </Col>
              </Row>
              {books.length === 0 && <MessageBox>No Books found</MessageBox>}
              <Row>
                {books.map((x) => (
                  <Col sm={6} lg={4} className="mb-3" key={x._id}>
                    <Book book={x}></Book>
                  </Col>
                ))}
              </Row>
              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    <Button
                      className={Number(page) === x + 1 ? 'text-bold' : ''}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
