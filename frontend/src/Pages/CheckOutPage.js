import { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Store from '../Store';

const CheckOutPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingInfor },
  } = state;
  const [fullName, setFullName] = useState(shippingInfor.fullName || '');
  const [addRess, setAddRess] = useState(shippingInfor.addRess || '');
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
  return (
    <div>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
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
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={addRess}
              onChange={(e) => setAddRess(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={addRess}
              onChange={(e) => setAddRess(e.target.value)}
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