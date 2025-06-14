import { Router } from "express";
import { findFunctions } from "../services/function.service.js";

const router = Router();

router.get("/functions", findFunctions);

export default router;