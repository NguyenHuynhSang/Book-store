const LoginForm = () => {
  return (
    <div class="login-form">
      <h1>AAAAAAAAAA</h1>
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
  );
};
export default LoginForm;
