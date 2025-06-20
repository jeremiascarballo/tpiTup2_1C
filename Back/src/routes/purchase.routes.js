import { Router } from "express";
import { createPurchase, userReserve } from "../services/purchase.service.js";

const router = Router();

router.post("/purchase", createPurchase);
router.get("/reserve", userReserve);

export default router;