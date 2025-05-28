import { Router } from "express";
import { findMovies, findOneMovie } from "../services/movie.service.js";

const router = Router();

router.get("/movies", findMovies);
router.get("/movies/:id", findOneMovie);


export default router;