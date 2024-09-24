import '../../Stylesheet/Register/Register.css';
import { useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';

export function Register() {

  const [user, setUser] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });

  const { signup } = useAuth();
  
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const result = await signup(user.correo, user.contraseña);
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
    <div>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="register-container">
          <div className="register-content">
            <div className="form-wrapper">
              <h2 className="title">Regístrate</h2>
              <div>
                <label className="label">Nombre</label>
                <input
                  name="nombre"
                  type="text"
                  id="name"
                  className="input"
                  placeholder="Tu nombre"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="label">Correo</label>
                <input
                  name="correo"
                  type="email"
                  id="email"
                  className="input"
                  placeholder="name@flowbite.com"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="label">Contraseña</label>
                <input
                  name="contraseña"
                  type="password"
                  id="password"
                  className="input"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="label">Confirmar contraseña</label>
                <input
                  type="password"
                  id="confirm-password"
                  className="input"
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="button">
                Registrarse
              </button>
            </div>
            <div className="info">
              <h2>¿Ya tienes una cuenta?</h2>
              <p className="text">Inicia sesión para continuar.</p>
              <button className="info-button">Iniciar sesión</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
