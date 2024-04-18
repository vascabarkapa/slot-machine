import asyncHandler from "express-async-handler";
import fs from "fs";

/**
 * @desc Return sequence of symbols in reel
 * @access Public
 */
export default asyncHandler(async (req, res) => {
    try {
        const rawData = await fs.promises.readFile('./data/SYM.json');
        const data = JSON.parse(rawData);

        res.json(data);
    } catch (error) {
        console.error("Error reading file:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
