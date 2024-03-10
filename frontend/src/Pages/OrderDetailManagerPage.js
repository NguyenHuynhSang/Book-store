import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import GetError, { moneyFormat } from '../utils';
import { Helmet } from 'react-helmet-async';
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import Store from '../Store';
import { toast } from 'react-toastify';

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
export default function OrderDetailManagerPage() {
  const urlParam = useParams();
  const { _id } = urlParam;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { loggedUser } = state;
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    order: [],
    loading: true,
    error: '',
  });
  const [delivery, seteDelivery] = useState('');
  const [shipName, setShipName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const deliveryStatus = ['waiting', 'comfirmed', 'delivering', 'delivered'];
  const round = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(
        `/api/orders/${order._id}`,
        {
          delivery,
          shipName,
          address,
          phone,
        },
        { headers: { Authorization: `Bearer ${loggedUser.token}` } }
      );

      toast('Updated Order');
      dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    } catch (error) {}
  };
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
        setShipName(result.data.shippingAddress.fullName);
        setAddress(result.data.shippingAddress.address);
        setPhone(result.data.shippingAddress.phone);
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Ship Name</Form.Label>
                  <Form.Control
                    placeholder="Enter Name"
                    value={shipName}
                    onChange={(e) => setShipName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Ship Address</Form.Label>
                  <Form.Control
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Ship Address</Form.Label>
                  <Form.Control
                    placeholder="Enter phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
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
                    <Col>{moneyFormat(order.itemsPrice)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Shipping Price</strong>
                    </Col>
                    <Col>{moneyFormat(order.shippingPrice)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>tax Price(10%)</strong>
                    </Col>
                    <Col> {moneyFormat(order.taxPrice)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>total</strong>
                    </Col>
                    <Col>
                      <strong>{moneyFormat(order.totalPrice)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Status</strong>
                    </Col>
                    <Col>
                      <strong className="bg-warning text-dark">
                        {order.deliverInfor}
                      </strong>
                    </Col>
                    <Form.Select
                      selectedValue={order.deliverInfor}
                      onChange={(e) => seteDelivery(e.target.value)}
                    >
                      {deliveryStatus.map((z) =>
                        z === order.deliverInfor ? (
                          <option selected value={z}>
                            {z}
                          </option>
                        ) : (
                          <option value={z}>{z}</option>
                        )
                      )}
                    </Form.Select>
                    <Button
                      className="mt-3"
                      onClick={(e) => handleUpdateOrder(e)}
                    >
                      Update Order
                    </Button>
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
