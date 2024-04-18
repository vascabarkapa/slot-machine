const express = require("express");
const { getReel } = require("../controllers/dataController");
const router = express.Router();

router.route("/reel").get(getReel);

module.exports = router;