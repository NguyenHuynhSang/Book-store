import axios from 'axios';

import { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import Store from '../Store';
import { Link } from 'react-router-dom';

const LoginForm = (props) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  let setLogin = props.setLogin;
  function showLogin(e) {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      setLogin(false);
    }
  }

  const submitHandler = async (e) => {
    console.log('submit');
    console.log(email);
    e.preventDefault();
    try {
      const { data } = await axios.post('api/user/login', {
        email,
        password,
      });
      console.log('user return');
      console.log(data);
      ctxDispatch({ type: 'USER_LOGGEDIN', payload: data });
      localStorage.setItem('loggedUser', JSON.stringify(data));
      setLogin(false);
    } catch (err) {
      // alert(err.response.data.message);
      alert('Sai thong tin dang nhap');
    }
  };

  const handleRememberme = (e) => {
    console.log(e.target.value);
    if (e.target.checked) {
      console.log('bla bla bla');
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
            <input
              id="remember-me"
              type="checkbox"
              onClick={(e) => handleRememberme(e)}
            />
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
            Tao moi{' '}
            <Link to="/signup" onClick={(e) => setLogin(false)}>
              click here
            </Link>
          </p>
        </Form>
      </div>
      )
    </div>
  );
};
export default LoginForm;
