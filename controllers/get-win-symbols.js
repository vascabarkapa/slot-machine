import asyncHandler from "express-async-handler";
import fs from "fs";

/**
 * @desc Return winning symbols
 * @access Public
 */
export default asyncHandler(async (req, res) => {
    try {
        const files = [
            'P_1.json',
            'P_2.json',
            'P_3.json',
            'P_4.json',
            'P_5.json',
            'P_6.json',
            'P_7.json',
            'P_8.json',
            'P_9.json'
        ];

        const data = files.map((file) => {
            const rawData = fs.readFileSync(`./data/${file}`);
            return JSON.parse(rawData);
        });

        res.json(data);
    } catch (error) {
        console.error("Error: ", error);
    }
});