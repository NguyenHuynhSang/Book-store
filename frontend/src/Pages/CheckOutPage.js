import { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import CheckOutStep from '../Components/CheckOutStep';
import Store from '../Store';

const CheckOutPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingInfor },
  } = state;
  const [fullName, setFullName] = useState(shippingInfor.fullName || '');
  const [addRess, setAddRess] = useState(shippingInfor.addRess || '');
  const [phoneNumber, setphoneNumber] = useState(
    shippingInfor.phoneNumber || ''
  );
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SHIPPING_INFOR',
      payload: {
        fullName,
        addRess,
      },
    });
    localStorage.setItem(
      'shippingInfor',
      JSON.stringify({ fullName, addRess })
    );
    console.log('submit');
  };
  useEffect(() => {
    if (!shippingInfor) {
      Navigate('/signin?redirect=shipping');
    }
  });

  return (
    <div>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <CheckOutStep step1 step2></CheckOutStep>
      <div className="container small-container">
        <h1 className="my-3">Check Out</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={addRess}
              onChange={(e) => setAddRess(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              value={phoneNumber}
              type="number"
              onChange={(e) => setphoneNumber(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="fullName">
            <div className="mb-3">
              <Button className="btn" type="submit">
                Next
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};
export default CheckOutPage;
