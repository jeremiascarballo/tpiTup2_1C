import { Router } from "express";
import { 
    userData, 
    addMovie, 
    addFunction, 
    deleteMovie, 
    deleteFunctions, 
    changeUserRole,
    deleteUser
    } from "../services/admins.service.js";


const router = Router();

router.get("/users", userData);

router.post("/movies", addMovie);
router.post("/functions", addFunction);
router.post("/users", changeUserRole);

router.delete("/movies/:id", deleteMovie);
router.delete("/function/:id", deleteFunctions);
router.delete("/users/:id", deleteUser);

export default router;