import { Router } from "express";
import { userData, addMovie } from "../services/admins.service.js";


const router = Router();

router.get("/users", userData);
router.post("/addmovie", addMovie);

export default router;