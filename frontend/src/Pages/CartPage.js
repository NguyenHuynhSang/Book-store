import axios from 'axios';
import { useContext } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Store from '../Store';
import Message from '../Components/Message';

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
    navigate('/signin');
  };
  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <h1>Cart</h1>
      <Row>
        <Col md={8}>
          {Items.length === 0 ? (
            <Message>Cart is empty!!!</Message>
          ) : (
            <ListGroup>
              {Items.map((x) => (
                <ListGroup.Item key={x._id}>
                  <Row className="align-items-center">
                    <Col mg={4}>
                      <img
                        src={x.image}
                        alt={x.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>
                      <Link to={`/book/${x.slug}`}></Link>
                    </Col>
                    <Col mg={3}>
                      <Button
                        variant="light"
                        onClick={() => updateCart(x, --x.quantity)}
                        disabled={x.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{x.quantity}</span>{' '}
                      <Button
                        variant="light"
                        onClick={() => updateCart(x, ++x.quantity)}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col mg={3}>{x.price * x.quantity}</Col>
                    <Col mg={2}>
                      <Button variant="light" onClick={() => removeItems(x)}>
                        <i className="fas fa-trash"></i>
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
                    Price: $
                    {Items.reduce((a, c) => a + c.price * c.quantity, 0)}
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
