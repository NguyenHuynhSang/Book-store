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

export default function BookProductPage() {
  const [sort, setSort] = useState({ field: 'id', isUp: false });
  const [filter, setFilter] = useState('');
  const [filterProp, setFilterProp] = useState('username');
  const [bookColumn, setBookColumn] = useState({
    column: [
      {
        name: 'ID',
        field: 'id',
        isUp: true,
        isActive: true,
        isSortAble: true,
      },
      {
        name: 'Book Name',
        field: 'name',
        isUp: true,
        isActive: false,
        isSortAble: true,
      },
      {
        name: 'CreateDate',
        field: 'createAt',
        isUp: true,
        isActive: false,
        isSortAble: true,
      },
      {
        name: 'Price',
        field: 'price',
        isUp: true,
        isActive: false,
        isSortAble: true,
      },
      {
        name: 'Count in stock',
        field: 'countInStock',
        isUp: false,
        isActive: false,
        isSortAble: true,
      },
      {
        name: 'Status',
        isUp: false,
        isActive: false,
        isSortAble: true,
      },
      {
        name: 'Action',
        isUp: false,
        isActive: false,
        isSortAble: false,
      },
    ],
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { loggedUser } = state;
  const [{ loading, error, books, deletedUser, isDeleted }, dispatch] =
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
  }, [sort]);

  const handleActive = (x) => {
    var updatedBookCol = bookColumn.column;
    updatedBookCol.forEach((b) => {
      if (b.field !== x.field) {
        b.isActive = false;
      } else {
        b.isActive = true;
        b.isUp = !b.isUp;
        setSort({ field: b.field, isUp: b.isUp });
      }
    });

    setBookColumn({ column: updatedBookCol });

    console.log(bookColumn);
    console.log(sort);
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
            </Col>
          </Form.Group>
          <table className="table box-container">
            <thead>
              <tr>
                {bookColumn.column.map((x) => (
                  <th onClick={() => handleActive(x)}>
                    <span>{x.name}</span>

                    {x.isSortAble ? (
                      x.isActive ? (
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
        </div>
      )}
    </div>
  );
}
