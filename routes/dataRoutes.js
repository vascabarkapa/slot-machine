const express = require("express");
const { testData } = require("../controllers/dataController");
const router = express.Router();

router.route("/reel").get(testData);

module.exports = router;