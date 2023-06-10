import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import Loading from '../Components/Loading';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Store from '../Store';
import MessageBox from '../Components/MessageBox';
import GetError from '../utils';
import axios from 'axios';
import Header from '../Components/Header/Index';

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
  const loggedUser = state;
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/order/orderhistory', {
        headers: { Authorization: `Bearer ${loggedUser.token}` },
      });
      dispatch({
        type: 'FETCH_FAIL',
        payload: GetError(error),
      });
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
              <th>Paid</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((x) => (
              <tr key={x._id}>
                <td>{x._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
