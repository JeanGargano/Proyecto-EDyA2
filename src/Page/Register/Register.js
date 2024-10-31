import { useState } from 'react';  // Importar useState
import { useAuth } from '../../Context/AuthProvider';  // Importar useAuth (de tu contexto de autenticación)
import { useNavigate } from 'react-router-dom';  // Importar useNavigate (de react-router-dom)
import '../../Stylesheet/Register/Register.css';

export function Register() {
  const [user, setUser] = useState({
    nombre: "",
    correo: "",
    contrasena: "",  // Cambia a "contrasena"
  });

  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Función para manejar cambios en los campos del formulario
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Registro en Firebase
      const result = await signup(user.correo, user.contrasena); // Asegúrate de que signup esté bien implementado

      // UID de Firebase
      const firebaseUid = result.user.uid;

      // Enviar datos al backend para registrar en MongoDB
      const response = await fetch('http://localhost:8000/posts/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: user.nombre,
          correo: user.correo,
          contrasena: user.contrasena,  // Asegúrate de que coincida con el backend
          firebaseUid,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();

      // Guardar el token en el localStorage
      localStorage.setItem('token', data.token);

      navigate('/info');
    } catch (error) {
      setError(error.message || 'Error en el registro');
    }
  };

  const redirect_login = () => {
    navigate('/');
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
                  name="contrasena"  // Cambia a "contrasena"
                  type="password"
                  id="password"
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
              <button className="info-button" onClick={redirect_login}>Iniciar sesión</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
