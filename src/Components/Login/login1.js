import '../../Stylesheet/Login/login1.css';

const Login = () => {
  return (
    <div className="login1-container">
      <div className="login1-content">
        <div className="login1-form-wrapper">
          <form className="login1-form">
            <h2 className="login1-title">Login</h2>
            <div>
              <label  className="login1-label">Your email</label>
              <input
                type="email"
                id="email"
                className="login1-input"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="login1-label">Your password</label>
              <input
                type="password"
                id="password"
                className="login1-input"
                required
              />
            </div>
            <button type="submit" className="login1-button">
              Submit
            </button>
          </form>
        </div>
        <div className="login1-info">
          <h2>¿No tienes una cuenta aún?</h2>
          <p className="login1-text">Regístrate y disfruta de nuestros servicios.</p>
          <button className="register-button">Regístrate</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
