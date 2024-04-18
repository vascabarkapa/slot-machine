import { Router } from "express";
import { getReel, getWinSymbols, initGame } from "../controllers/index.js";

const router = Router();

router.route("/reel").get(getReel);
router.route("/win").get(getWinSymbols);
router.route("/init").get(initGame);

export default router;