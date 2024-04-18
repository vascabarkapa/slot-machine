const express = require("express");
const { getReel, getWinSymbols } = require("../controllers/dataController");
const router = express.Router();

router.route("/reel").get(getReel);
router.route("/win").get(getWinSymbols);

module.exports = router;