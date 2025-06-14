import { FunctionCinema } from "../model/function.js";

export const findFunctions = async (req, res) =>{
    try {
        const functions = await FunctionCinema.findAll();
        res.json(functions);
    } catch (error) {
        console.error('Error al obtener las funciones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};