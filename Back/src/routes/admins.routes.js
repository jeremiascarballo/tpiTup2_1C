import { Router } from "express";
import { userData, addMovie, addFunction } from "../services/admins.service.js";


const router = Router();

router.get("/users", userData);
router.post("/addmovie", addMovie);
router.post("/addfunction", addFunction);

export default router;