import { Router } from "express";
import { findMovies } from "../services/movie.service.js";

const router = Router();

router.get("/movies", findMovies);


export default router;