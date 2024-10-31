import { useState, useEffect } from 'react';
import '../../Stylesheet/Login/Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../Firebase/Firebase.js'; // Asegúrate de que esta ruta sea correcta

export function Login() {
  const [user, setUser] = useState({
    correo: "",
    contrasena: ""
  });
  const { user: currentUser } = useAuth(); // Obtener el usuario actual del contexto
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/home'); // Redirige al usuario a la página de inicio si ya está autenticado
    }
  }, [currentUser, navigate]); // Dependencias

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    console.log("Datos enviados:", user); // Agregado para depuración

    try {
      // Utilizar la función de inicio de sesión de Firebase
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, user.correo, user.contrasena);
      
      console.log("Usuario autenticado:", userCredential.user);
      navigate('/home'); // Navega solo si la autenticación es exitosa
    } catch (error) {
      setError(error.message || 'Error al iniciar sesión');
      console.error("Error en handleSubmit:", error); // Agregado para depuración
    }
  };

  const redirectRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      {error && <p className="error-message">{error}</p>}
      <div className="login-content">
        <div className="login-form-wrapper">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-title">Login</h2>
            <div>
              <label className="login-label">Tu correo</label>
              <input
                type="email"
                id="email"
                className="login-input"
                placeholder="name@flowbite.com"
                required
                name="correo"
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
                name="contrasena"
                onChange={handleChange}
              />
            </div> <br />
            <button type="submit" className="login-button">
              Submit
            </button>
          </form>
        </div>
        <div className="login-info">
          <h2>¿No tienes una cuenta aún?</h2>
          <p className="login-text">Regístrate y disfruta de nuestros servicios.</p>
          <button className="register-button" onClick={redirectRegister}>Regístrate</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
