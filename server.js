const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors({ origin: process.env.FRONT_URL }));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});