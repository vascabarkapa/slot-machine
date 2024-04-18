const express = require("express");
const { getReel, getWinSymbols, initGame } = require("../controllers/dataController");
const router = express.Router();

router.route("/reel").get(getReel);
router.route("/win").get(getWinSymbols);
router.route("/init").get(initGame);

module.exports = router;