import InfoModel from "../models/InfoModel.js";
import mongoose from "mongoose";

export const createInfo = async (req, res) => {
    try {
        const newInfo = await InfoModel.create(req.body);
        res.status(201).json({
            message: "Información cargada correctamente!",
            post: newInfo
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
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