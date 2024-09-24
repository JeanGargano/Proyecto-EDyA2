import { useState } from 'react';
import '../../Stylesheet/Login/Login.css';
import { useAuth } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';

export function Login(){

  const [user, setUser] = useState({
    correo: "",
    contraseña:""
  })

  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const result = await login(user.correo, user.contraseña);
      navigate("/home");
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("El usuario no existe");
          break;
        case "auth/wrong-password":
          setError("Contraseña incorrecta");
          break;
        case "auth/invalid-email":
          setError("Formato de correo inválido");
          break;
        default:
          setError("Error inesperado: " + error.message);
      }
    }
  };
  
  return (
    <div className="login-container">
      {error && <p className="error-message">{error}</p>}
      <div className="login-content">
        <div className="login-form-wrapper">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-title">Login</h2>
            <div>
              <label  className="login-label">Tu correo</label>
              <input
                type="email"
                id="email"
                className="login-input"
                placeholder="name@flowbite.com"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="login-label">Tu contraseña</label>
              <input
                type="password"
                id="password"
                className="login-input"
                required
                onChange={handleChange}
              />
            </div> <br></br> <br></br>
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



export default Login;
