import asyncHandler from "express-async-handler";
import fs from "fs";

/**
 * @desc Return initialization of game
 * @access Public
 */
export default asyncHandler(async (req, res) => {
    try {
        const rawData = await fs.promises.readFile('./data/GAME.json');
        const data = JSON.parse(rawData);

        res.json(data);
    } catch (error) {
        console.error("Error reading file:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
