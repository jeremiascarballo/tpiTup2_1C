import jwt from "jsonwebtoken";

import { User } from "../model/user.js";
import { Movie } from "../model/movie.js";
import { FunctionCinema } from '../model/function.js'
import { Purchase } from "../model/purchase.js";

export const userData = async (req, res) => {

  const authHeader = req.headers.authorization;

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_STRING);
    const { role } = decoded;

    if (role === "superadmin") {
      const users = await User.findAll();
      return res.json(users);
    } else {
      return res.status(403).json({ message: "No tenés permisos suficientes" });
    }

  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}

export const addMovie = async (req, res) => {
  try {
    const {
      title,
      origin,
      director,
      qualification,
      duration,
      img,
      description
    } = req.body;

    const existingMovie = await Movie.findOne({
      where: { title }
    });

    if (existingMovie) {
      return res.status(400).json({ message: "Pelicula ya agregada" });
    }

    const newMovie = await Movie.create({
      title,
      origin,
      director,
      qualification,
      duration,
      img,
      description
    });

    res.json(newMovie.id);

  } catch (error) {
    console.error("Error al agregar película:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};


export const addFunction = async (req,res) => {
  try {
    const {
      date,
      totalSeats,
      idMovie
    }=req.body

    const newFunction = await FunctionCinema.create({
      date,
      total_seats: totalSeats,
      available_seats: totalSeats,
      movie_id: idMovie
    });
    res.json(newFunction.id);

  }
  catch (error) {
    console.error("Error al agregar la funcion:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
} 

export const deleteMovie = async (req, res) => {

  const { id } = req.params;

  try {
    const functions = await FunctionCinema.findAll({
      where: { movie_id: id },
    });

    const functionsId = functions.map(f => f.id);

    if (functionsId.length > 0) {

      await Purchase.destroy({
        where: { function_id: functionsId }
      });

      await FunctionCinema.destroy({
        where: { id: functionsId }
      });
    }

    const deleted = await Movie.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    res.json({ message: "Película eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la película:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const deleteFunctions = async (req, res) => {

  const { id } = req.params;

  try {

    await Purchase.destroy({ where: { function_id: id } });

    const deleted = await FunctionCinema.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Funcion no encontrada" });
    }

    res.json({ message: "Funcion eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la Funcion:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const changeUserRole = async (req, res) =>{
    try{
      const {
        userId,
        selectRole
      }=req.body

      const userSelect= await User.findOne({
        where:{id: userId}
      }) 

      userSelect.role = selectRole;
      await userSelect.save();

      res.json({ message: "Rol actualizado correctamente", user: userSelect });
    }
    catch(error){
      console.error("Error al eliminar al cambiar el rol:", error);
    res.status(500).json({ message: "Error del servidor" });
    }
}

export const deleteUser = async (req, res) => {

  const { id } = req.params;

  try {

    await Purchase.destroy({ where: { user_id: id } });

    const deleted = await User.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el Usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};