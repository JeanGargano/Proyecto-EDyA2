import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';  // Importamos jsonwebtoken

const JWT_SECRET = 'Testing';  // Definir una clave secreta (guárdala en las variables de entorno)

// Crear nuevo usuario
export const registerUser = async (req, res) => {
  const { nombre, correo, contrasena, firebaseUid } = req.body;
  console.log("Datos de registro:", req.body); // Verificar los datos recibidos
  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ correo });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya está registrado' });
    }

    // Encriptar la contraseña antes de guardarla en MongoDB
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(contrasena, salt);

    // Crear el nuevo usuario
    const newUser = new User({
      nombre,
      correo,
      contrasena: hashedPassword,
      firebaseUid
    });

    // Guardar usuario en la base de datos
    await newUser.save();

    // Crear el token JWT
    const token = jwt.sign(
      { uid: newUser._id, nombre: newUser.nombre, correo: newUser.correo },
      JWT_SECRET,
      { expiresIn: '1h' }  // El token expira en 1 hora
    );

    // Enviar respuesta al cliente con el token
    return res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controlador para iniciar sesión
export const loginUser = async (req, res) => {
  const { correo, contrasena } = req.body;
  console.log("Datos de inicio de sesión:", req.body); // Verificar los datos recibidos

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ correo });
    if (!user) {
      console.error("Usuario no encontrado"); // Log adicional
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    console.log("Usuario encontrado:", user); // Verificar el usuario encontrado

    // Verificar si la contraseña es correcta
    const isPasswordValid = bcrypt.compareSync(contrasena, user.contrasena);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Crear el token JWT
    const token = jwt.sign(
      { uid: user._id, nombre: user.nombre, correo: user.correo },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log("Token generado:", token); // Verificar el token generado
    // Enviar el token como respuesta
    return res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token
    });
    
  } catch (error) {
    console.error("Error en loginUser:", error);
    return res.status(500).json({ message: error.message });
  }
};


