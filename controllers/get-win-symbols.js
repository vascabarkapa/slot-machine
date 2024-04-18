import asyncHandler from "express-async-handler";
import fs from "fs";

/**
 * @desc Return array of winning symbols
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

        const fileReadPromises = files.map(async (file) => {
            const rawData = await fs.promises.readFile(`./data/${file}`);
            return JSON.parse(rawData);
        });

        const data = await Promise.all(fileReadPromises);

        res.json(data);
    } catch (error) {
        console.error("Error reading files:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
