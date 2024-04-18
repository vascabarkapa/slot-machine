import { Router } from "express";
import dataRoutes from "./data.js";

const router = Router();
router.use('/', dataRoutes);

export default router;