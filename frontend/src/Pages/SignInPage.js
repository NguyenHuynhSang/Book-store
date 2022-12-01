import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, redirect, useLocation } from 'react-router-dom';

const Signin = () => {
  const { search } = useLocation();
  const reUrl = new URLSearchParams(search).get('redirect');
  const redirect = reUrl ? reUrl : '/';
  return (
    <Container className="s-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign in</h1>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label type="email" required>
            Email
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label type="password" required>
            Password
          </Form.Label>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign in</Button>
        </div>
        <div className="mb-3">
          New here? <Link to={`/signup/redirect/${redirect}`}>Create one</Link>
        </div>
      </Form>
    </Container>
  );
};
export default Signin;
