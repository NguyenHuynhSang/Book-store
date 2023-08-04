import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import Loading from '../Components/Loading';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Store from '../Store';
import MessageBox from '../Components/MessageBox';
import GetError from '../utils';
import axios from 'axios';
import { toast } from 'react-toastify';

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

export default function OrderHistoryPage() {
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
        <title>Order History</title>
      </Helmet>
      <h1>Order history</h1>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Delivered?</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((x) => (
              <tr key={x._id}>
                <td>
                  {' '}
                  <Link to={`/order/${x._id}`}>{x._id}</Link>
                </td>
                <td>{x.createdAt}</td>
                <td>{x.totalPrice}</td>
                <th>{x.isDelivered ? 'yes' : 'no'}</th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
