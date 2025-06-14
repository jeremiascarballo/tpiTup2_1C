import { Router } from "express";
import { loginUser, registerUser} from "../services/user.service.js";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;