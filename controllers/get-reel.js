import asyncHandler from "express-async-handler";
import fs from "fs";

/**
 * @desc Return random reels
 * @access Public
 */
export default asyncHandler(async (req, res) => {
    try {
        const rawData = fs.readFileSync('./data/SYM.json');
        const data = JSON.parse(rawData);

        res.json(data);
    } catch (error) {
        console.error("Error: ", error);
    }
});