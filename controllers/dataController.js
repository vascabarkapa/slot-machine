const asyncHandler = require("express-async-handler");
const fs = require('fs');

/**
 * @desc Return random reels
 * @access Public
 */
const getReel = asyncHandler(async (req, res) => {
    try {
        const rawData = fs.readFileSync('./data/SYM.json');
        const data = JSON.parse(rawData);

        res.json(data);
    } catch (error) {
        console.error("Error: ", error);
    }
});

module.exports = {
    getReel
}