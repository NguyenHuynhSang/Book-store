const LoginForm = (props) => {
  let setLogin = props.setLogin;
  function showLogin(e) {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      setLogin(false);
    }
  }

  return (
    <div>
      (
      <div class="login-form" onClick={(e) => showLogin(e)}>
        <form action="">
          <h3>Dang Nhap</h3>
          <p>Username</p>
          <input type="email" id="username" placeholder="Nhap email" />
          <p>Password</p>
          <input type="password" id="password" placeholder="Nhap mat khau" />
          <div class="checkbox">
            <input type="checkbox" name="" id="remember-me" />
            <label for="remember-me">remember-me</label>
          </div>
          <input type="submit" value="sign in" class="btn" id="login-submit" />
          <p>
            Quen mat khau <a href="/">click here</a>
          </p>
          <p>
            Tao moi <a href="/">click here</a>
          </p>
        </form>
      </div>
      )
    </div>
  );
};
export default LoginForm;
