import InfoModel from "../models/InfoModel.js";
import { getRelativeFilePath } from "../Middleware/multer.js";
import mongoose from "mongoose";

// Controlador para crear la información del usuario con la foto de perfil
export const createInfo = async (req, res) => {
    try {
        const firebaseUid = req.user?.id;
        if (!firebaseUid) {
            return res.status(400).json({ message: 'UID de Firebase no encontrado.' });
        }

        const { fullname, profession, email, phone, location } = req.body;
        const profileImage = req.file ? getRelativeFilePath(req.file.path) : null; // Obtener la ruta relativa

        // Buscar si ya existe un registro con este firebaseUid
        const existingInfo = await InfoModel.findOne({ firebaseUid });

        if (existingInfo) {
            // Actualizar la información existente
            existingInfo.fullname = fullname;
            existingInfo.profession = profession;
            existingInfo.email = email;
            existingInfo.phone = phone;
            existingInfo.location = location;
            if (profileImage) {
                existingInfo.userProfilePath = profileImage; // Actualizar imagen si hay una nueva
            }
            await existingInfo.save();
            return res.status(200).json({ message: 'Información actualizada exitosamente.', updatedInfo: existingInfo });
        }

        // Si no existe, crear nueva información
        const newInfo = new InfoModel({ 
            firebaseUid, 
            fullname, 
            profession, 
            email, 
            phone, 
            location,
            userProfilePath: profileImage, // Guardar la ruta de la imagen en la base de datos
        });

        await newInfo.save();
        res.status(201).json({ message: 'Información creada exitosamente.', newInfo });
    } catch (error) {
        console.error('Error al crear o actualizar la información:', error);
        res.status(500).json({ message: 'Error al crear o actualizar la información.', error: error.message });
    }
};



export const updateInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedInfo = await InfoModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedInfo) return res.status(404).json({ message: "Información de usuario no encontrada" });
        res.status(200).json({
            message: "Información de usuario actualizada correctamente!",
            post: updatedInfo
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Buscar un usuario por id_user y retornar el fullname
export const getFullnameById = async (req, res) => {
    try {
        const { id_user } = req.params;  // Obtener id_user de los parámetros
        const userInfo = await InfoModel.findOne({ id_user });  // Buscar en la base de datos
        if (!userInfo) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ fullname: userInfo.fullname });  // Retornar el fullname
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener la información del usuario


export const getInfo = async (req, res) => {
    try {
        const userId = req.user.id; 
    
        const user = await InfoModel.findOne({ firebaseUid: userId }); // Cambiado a InfoModel
        
        if (!user) {
            
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    
        res.status(200).json({
            fullname: user.fullname,
            profession: user.profession,
            email: user.email,
            phone: user.phone,
            location: user.location,
            profileImage: user.userProfilePath // Asegúrate de usar el campo correcto para la imagen
        });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};


export const getBasicUserInfo = async (req, res) => {
    try {
        const users = await InfoModel.find({}, 'fullname profession firebaseUid userProfilePath');
        
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No se encontró información de usuarios." });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("Error al obtener información básica de los usuarios:", error);
        res.status(500).json({ message: "Error al obtener información de los usuarios." });
    }
};
