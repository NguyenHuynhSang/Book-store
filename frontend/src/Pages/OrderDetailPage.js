import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import GetError from '../utils';
import { Helmet } from 'react-helmet-async';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQ':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, order: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function OrderDetailPage() {
  const urlParam = useParams();
  const { _id } = urlParam;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    order: [],
    loading: true,
    error: '',
  });
  function moneyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  const round = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  useEffect(() => {
    console.log('call api  1 ');
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQ' });
      try {
        console.log('call api   ');
        const result = await axios.get(`/api/orders/${_id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        // setBooks(result.data);
        console.log(result);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: GetError(err) });
      }
    };
    fetchData();
  }, [_id]);
  return (
    <div>
      <Helmet>
        <title>Order Detail</title>
      </Helmet>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping infor</Card.Title>
              <Card.Text>
                <strong>Name:</strong>
                {order.shippingAddress?.fullName}
                <br></br>
                <strong>Address:</strong>
                {order.shippingAddress?.address}
                <br></br>
                <strong>Phone:</strong>
                {order.shippingAddress?.phone}
                <br></br>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong>
                Tra khi nhan
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong>
                Tra khi nhan
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup>
                <Row className="mb-2">
                  <Col mg={4}>
                    <strong>Name</strong>
                  </Col>
                  <Col mg={3}>
                    {' '}
                    <strong>quantity</strong>
                  </Col>
                  <Col mg={3}>
                    {' '}
                    <strong>Price x quantity</strong>
                  </Col>
                </Row>
                {order.orderItems?.map((x) => (
                  <ListGroup.Item key={x._id}>
                    <Row className="align-items-center">
                      <Col mg={4}>
                        <img
                          src={x.image}
                          alt={x.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>
                        <strong className="ms-2">{x.name}</strong>
                        <Link to={`/book/${x.slug}`}></Link>
                      </Col>
                      <Col mg={3}>{x.quantity}</Col>
                      <Col mg={3}> {moneyFormat(x.price * x.quantity)}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Sumary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Items</strong>
                    </Col>
                    <Col>${order.itemsPrice?.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Shipping Price</strong>
                    </Col>
                    <Col>${order.shippingPrice?.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>tax Price</strong>
                    </Col>
                    <Col>${order.taxPrice?.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>total</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice?.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
