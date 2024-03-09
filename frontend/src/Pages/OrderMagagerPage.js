import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import Loading from '../Components/Loading';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Store from '../Store';
import MessageBox from '../Components/MessageBox';
import GetError from '../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Col, Form, Row } from 'react-bootstrap';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQ':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderManagerPage() {
  const { state } = useContext(Store);
  const navigate = useNavigate();
  const { loggedUser } = state;
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('token' + loggedUser.token);
        const { data } = await axios.get('/api/orders/orderHistory', {
          headers: { Authorization: `Bearer ${loggedUser.token}` },
        });
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: GetError(error),
        });
        console.log(GetError(error));
      }
    };
    fetchData();
  }, [loggedUser]);
  return (
    <div>
      <Helmet>
        <title>Order Manager</title>
      </Helmet>
      <h1>Order Manager</h1>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Form.Group
            as={Row}
            className="mb-4 box-container"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="1" style={{ margin: 'auto 0' }}>
              Filter
            </Form.Label>
            <Col sm="1" style={{ margin: 'auto 0' }}>
              <Form.Select aria-label="Default select example"></Form.Select>
            </Col>
            <Col sm="8" style={{ margin: 'auto 0' }}>
              <Form.Control type="text" placeholder="filter text" />
            </Col>
            <Col sm="1" style={{ margin: 'auto 0' }}>
              <Button>Reset</Button>
            </Col>
          </Form.Group>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Total</th>
                <th>Delivered?</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((x) => (
                <tr key={x._id}>
                  <td>
                    {' '}
                    <Link to={`/seller/orderdetail/${x._id}`}>{x._id}</Link>
                  </td>
                  <td>{x.createdAt}</td>
                  <td>{x.shippingAddress.fullName}</td>
                  <td>{x.shippingAddress.phone}</td>
                  <td>{x.totalPrice}</td>
                  <th>{x.isDelivered ? 'yes' : 'no'}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
