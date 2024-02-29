import axios from 'axios';
import { useContext } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Store from '../Store';
import Message from '../Components/Message';
import { moneyFormat } from '../utils';

const CartPage = (props) => {
  let navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { Items },
  } = state;
  const updateCart = async (item, quantity) => {
    const { data } = await axios.get(`api/books/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Out of Stock!!! Only ' + data.countInStock + ' available');
    }
    if (quantity === 0) {
      ctxDispatch({ type: 'REMOVE_ITEM', payload: item });
    } else ctxDispatch({ type: 'ADD_ITEM', payload: { ...item, quantity } });
    //navigate('/cart');
  };

  const removeItems = (item) => {
    ctxDispatch({ type: 'REMOVE_ITEM', payload: item });
    console.log(Items);
  };
  const signIn = () => {
    navigate('/checkout');
  };
  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <h1>Cart</h1>
      <Row className="cart-items ms-4">
        <Col md={8}>
          {Items.length === 0 ? (
            <Message>Cart is empty!!!</Message>
          ) : (
            <ListGroup className="">
              {Items.map((x) => (
                <ListGroup.Item key={x._id}>
                  <Row className="align-items-center cart-item">
                    <Col md={8}>
                      <div className="cart-item-infor">
                        <div>
                          <Link to={`/book/${x.slug}`}>
                            <img
                              src={x.image}
                              alt={x.name}
                              className="img-fluid rounded cart-item-img-thumbnail"
                            ></img>
                          </Link>
                        </div>

                        <span className="ms-5 cart-item-book-name">
                          <Link>{x.name}</Link>
                        </span>
                      </div>
                    </Col>
                    <Col md={1}>
                      <Button
                        variant="light"
                        onClick={() => updateCart(x, --x.quantity)}
                        disabled={x.quantity === 1}
                      >
                        <i className="btn-add-minus-cart fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{x.quantity}</span>{' '}
                      <Button
                        variant="light"
                        onClick={() => updateCart(x, ++x.quantity)}
                      >
                        <i className=" btn-add-minus-cart fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={2} className=" text-price-base  book-cart-price">
                      {moneyFormat(x.price * x.quantity)}
                    </Col>
                    <Col md={1}>
                      <Button variant="light" onClick={() => removeItems(x)}>
                        <i className="btn-add-minus-cart fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal: {Items.reduce((a, c) => a + c.quantity, 0)}
                    {''}
                  </h3>
                  <p>
                    {' '}
                    Price: VND{'    '}
                    <span className="text-price-base book-detail-price">
                      {' '}
                      {moneyFormat(
                        Items.reduce((a, c) => a + c.price * c.quantity, 0)
                      )}
                    </span>
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      disabled={Items.length === 0}
                      variant="primary"
                      onClick={() => signIn()}
                    >
                      Check out
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
};
export default CartPage;
