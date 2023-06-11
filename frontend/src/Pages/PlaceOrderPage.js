import React, { useContext, useReducer } from 'react';
import CheckOutStep from '../Components/CheckOutStep';
import { Helmet } from 'react-helmet-async';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import Store from '../Store';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GetError from '../utils';
import axios from 'axios';
import Header from '../Components/Header/Index';

const reducer = (action, state) => {
  switch (action.type) {
    case 'CREATE_REQ':
      return { ...state, loading: true };
    case 'CREATE_SUCC':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default function PlaceOrderPage() {
  const { state, dispatch: dispatch } = useContext(Store);
  const { cart, loggedUser } = state;

  const [{ loading, error }, ctxDispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const navigate = useNavigate();
  function moneyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  const round = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.totalPrice = round(
    cart.Items.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round(0) : round(10);
  cart.taxPrice = round(0.15 * cart.itemsPrice);

  const planOrderHandler = async () => {
    try {
      const { data } = axios.post(
        'api/orders',
        {
          orderItems: cart.Items,
          shippingAddress: cart.shippingAddress,
          paymentMenthod: cart.paymentMenthod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          header: {
            authorization: `Bearer ${loggedUser.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCC' });
      localStorage.removeItem('cartItems');
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast(GetError(err));
    }
  };
  return (
    <div>
      <CheckOutStep step1 step2 step3 step4></CheckOutStep>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Order Detail</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping infor</Card.Title>
              <Card.Text>
                <strong>Name:</strong>
                {cart.shippingInfor.fullName}
                <br></br>
                <strong>Address:</strong>
                {cart.shippingInfor.addRess}
                <br></br>
                <Link to="/shipping">Edit </Link>
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
                {cart.Items.map((x) => (
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
                    <Col>${cart.itemsPrice?.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Shipping Price</strong>
                    </Col>
                    <Col>${cart.shippingPrice?.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>tax Price</strong>
                    </Col>
                    <Col>${cart.taxPrice?.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>total</strong>
                    </Col>
                    <Col>
                      <strong>${cart.totalPrice?.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={planOrderHandler}
                      disabled={cart.Items.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}