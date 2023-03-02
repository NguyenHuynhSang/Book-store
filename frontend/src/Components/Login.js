import axios from 'axios';

import { useState } from 'react';
import { Form } from 'react-bootstrap';

const LoginForm = (props) => {
  let setLogin = props.setLogin;
  function showLogin(e) {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      setLogin(false);
    }
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submitHandler = async (e) => {
    console.log('submit');
    e.preventDefault();
    try {
      const { data } = await axios.post('api/user/login', { email, password });
      console.log(data);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <div>
      (
      <div className="login-form" onClick={(e) => showLogin(e)}>
        <Form onSubmit={submitHandler}>
          <h3>Dang Nhap</h3>
          <p>Username</p>
          <input
            id="username"
            autoCapitalize="none"
            placeholder="Nhap email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password</p>
          <input
            type="password"
            id="password"
            placeholder="Nhap mat khau"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="checkbox">
            <input type="checkbox" name="" id="remember-me" />
            <label htmlFor="remember-me">remember-me</label>
          </div>
          <input
            type="submit"
            onClick={submitHandler}
            value="sign in"
            Name="btn"
            id="login-submit"
          />
          <p>
            Quen mat khau <a href="/">click here</a>
          </p>
          <p>
            Tao moi <a href="/">click here</a>
          </p>
        </Form>
      </div>
      )
    </div>
  );
};
export default LoginForm;
