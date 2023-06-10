import { useContext, useState } from 'react';
import Store from '../Store';
import Axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GetError from '../utils';
import { toast } from 'react-toastify';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  // back to last page after sign up
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const nagigate = useNavigate();
  const submitHandler = async (e) => {
    console.log(username);
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('passwork not match');
      return;
    }
    try {
      const { data } = await Axios.post('/api/user/signup', {
        email,
        username,
        name,
        password,
      });
      ctxDispatch({ type: 'USER_LOGGEDIN', payload: data });
      localStorage.setItem('loggedUser', JSON.stringify(data));
      nagigate(redirect || '/');
    } catch (err) {
      console.log(GetError(err));
    }
  };

  return (
    <Container className="s-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            required
            onChange={(e) => setUserName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <Form.Group className="mb-3" controlId="comfirmPassword">
            <Form.Label>Comfirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit" onClick={submitHandler}>
            Sign up
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default SignUpPage;
