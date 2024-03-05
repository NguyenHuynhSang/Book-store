import React, { useContext, useEffect, useReducer, useState } from 'react';
import Loading from '../../Components/Loading';
import MessageBox from '../../Components/MessageBox';
import { Button, Col, Form, Row, Toast } from 'react-bootstrap';
import axios from 'axios';
import Store from '../../Store';
import GetError, { moneyFormat } from '../../utils';
import { toast } from 'react-toastify';
import {
  bookProductsReducer,
  FETCH_BOOK_PRODUCT_SUCCESS,
} from '../../Reducers/BookReducer';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { URL_SELLER_ADD_PRODUCT } from '../../Routes/UrlMapper';

export default function BookProductPage() {
  const [sort, setSort] = useState({ field: 'id', isUp: false });
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [filterProp, setFilterProp] = useState('username');
  const [bookColumn, setBookColumn] = useState({
    column: [
      {
        name: 'ID',
        field: 'id',
        isUp: true,
        isCurrentSort: true,
        isSortAble: true,
        isShow: true,
      },
      {
        name: 'Book Name',
        field: 'name',
        isUp: true,
        isCurrentSort: false,
        isSortAble: true,
        isShow: true,
      },
      {
        name: 'CreateDate',
        field: 'createAt',
        isUp: true,
        isCurrentSort: false,
        isSortAble: true,
        isShow: true,
      },
      {
        name: 'Price',
        field: 'price',
        isUp: true,
        isCurrentSort: false,
        isSortAble: true,
        isShow: true,
      },
      {
        name: 'Count in stock',
        field: 'countInStock',
        isUp: false,
        isCurrentSort: false,
        isSortAble: true,
        isShow: true,
      },
      {
        name: 'Status',
        isUp: false,
        isCurrentSort: false,
        isSortAble: true,
        isShow: true,
      },
      {
        name: 'Action',
        isUp: false,
        isCurrentSort: false,
        isSortAble: false,
        isShow: true,
      },
    ],
  });
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { loggedUser } = state;

  const CreateProduct = () => {
    navigate(URL_SELLER_ADD_PRODUCT);
  };
  const [{ loading, error, books, pages = 1, countBooks }, dispatch] =
    useReducer(bookProductsReducer, {
      books: [],
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/books/products', {
          headers: { Authorization: `Bearer ${loggedUser.token}` },
          params: {
            sort: sort,
            page: page,
          },
        });
        dispatch({ type: FETCH_BOOK_PRODUCT_SUCCESS, payload: data });
        // console.log(data);
      } catch (error) {
        const err = GetError(error);
        console.log(err);
        toast.error(err);
      }
    };
    fetchData();
  }, [sort, page]);

  const toPage = (num) => {
    setPage(num);
  };
  const handleActive = (x) => {
    var updatedBookCol = bookColumn.column;
    updatedBookCol.forEach((b) => {
      if (b.field !== x.field) {
        b.isCurrentSort = false;
      } else {
        b.isCurrentSort = true;
        b.isUp = !b.isUp;
        setSort({ field: b.field, isUp: b.isUp });
      }
    });
    console.log(pages);
    setBookColumn({ column: updatedBookCol });
  };
  return (
    <div>
      <h1>Book Products</h1>
      {false ? (
        <Loading></Loading>
      ) : false ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div>
          <Form.Group
            as={Row}
            className="mb-4 box-container"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="1">
              Filter
            </Form.Label>
            <Col sm="1">
              <Form.Select aria-label="Default select example"></Form.Select>
            </Col>
            <Col sm="8">
              <Form.Control type="text" placeholder="filter text" />
            </Col>
            <Col sm="1">
              <Button>Reset</Button>
              <Button
                onClick={() => CreateProduct()}
                className="mx-1 bg-warning text-dark"
              >
                Create
              </Button>
            </Col>
          </Form.Group>
          <table className="table box-container">
            <thead>
              <tr>
                {bookColumn.column.map((x) => (
                  <th onClick={() => handleActive(x)}>
                    <span>{x.name}</span>

                    {x.isSortAble ? (
                      x.isCurrentSort ? (
                        x.isUp ? (
                          <i className="ms-2 fa fa-sort-up"></i>
                        ) : (
                          <i className="ms-2 fa fa-sort-down"></i>
                        )
                      ) : (
                        <i className="ms-2 fa fa-arrow-down-short-wide"></i>
                      )
                    ) : (
                      ''
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {books.map((x) => (
                <tr key={x._id}>
                  <td>{x._id}</td>
                  <td>{x.name}</td>
                  <td> {x.createdAt}</td>
                  <td>{moneyFormat(x.price)}</td>
                  <td>{x.countInStock}</td>

                  <td>{x.status}</td>
                  <td>
                    <Button className="me-3" variant="info">
                      Detail
                    </Button>
                    <Button className="me-3">Edit</Button>
                    <Button className="me-3" variant="danger">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="paging-container">
            {[...Array(pages).keys()].map((x) => (
              <div key={x + 1}>
                <Button
                  className={
                    Number(page) === x + 1
                      ? 'btn-warning text-bold'
                      : 'btn-light text-dark'
                  }
                  onClick={() => toPage(x + 1)}
                >
                  {x + 1}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
