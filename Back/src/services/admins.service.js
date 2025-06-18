import jwt from "jsonwebtoken";

import { User } from "../model/user.js";
import { Movie } from "../model/movie.js";

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