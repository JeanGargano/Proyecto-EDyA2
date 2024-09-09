import '../../Stylesheet/Login/Login.css';

const login = () => {

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form-wrapper">
          <form className="login-form">
            <h2 className="login-title">login</h2>
            <div>
              <label  className="login-label">Your email</label>
              <input
                type="email"
                id="email"
                className="login-input"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="login-label">Your password</label>
              <input
                type="password"
                id="password"
                className="login-input"
                required
              />
            </div>
            <button type="submit" className="login-button">
              Submit
            </button>
          </form>
        </div>
        <div className="login-info">
          <h2>¿No tienes una cuenta aún?</h2>
          <p className="login-text">Regístrate y disfruta de nuestros servicios.</p>
          <button className="register-button">Regístrate</button>
        </div>
      </div>
    </div>
  );
}



export default login;
