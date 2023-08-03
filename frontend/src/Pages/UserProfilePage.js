import React, { useContext, useReducer, useState } from 'react';
import Store from '../Store';
import { Helmet } from 'react-helmet-async';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
const reducer = (state, action) => {
  switch (action.type) {
    case 'Update_REQ':
      return { ...state, loading: true };
    case 'Update_SUCC':
      return { ...state, loading: false };
    case 'Update_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function UserProfilePage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { loggedUser } = state;
  const [name, setName] = useState(loggedUser.name);
  const [email, setEmail] = useState(loggedUser.email);
  const [password, setPassword] = useState('');
  const [cfmpassword, setCfmpasswod] = useState('');

  const [{ loading }, dispatch] = useReducer(reducer, { loading: false });
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        '/api/user/update',
        {
          name,
          email,
          password,
        },
        { headers: { Authorization: `Bearer ${loggedUser.token}` } }
      );
      dispatch({
        type: 'Update_SUCC',
      });
      toast('Save success');
    } catch (error) {}
  };
  return (
    <div className="container small-container">
      <Helmet>
        <title>User profile</title>
      </Helmet>
      <h1 className="mb-3">User Infor</h1>
      <form onSubmit={(e) => submitHandler(e)}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label> Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label> Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label> New password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label> Comfirm password</Form.Label>
          <Form.Control
            value={cfmpassword}
            onChange={(e) => setCfmpasswod(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
}
