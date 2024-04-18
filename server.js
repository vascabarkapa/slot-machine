import express from "express";
import dotenv from "dotenv";
import loader from "./loaders/index.js";

dotenv.config();

const server = express();

loader(server);

server.listen(port, error => {
    if (error) {
        console.log(error);
        return process.exit(1);
    }
    console.log(`Server is running on ${port}`);
});