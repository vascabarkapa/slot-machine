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

        let reels = [];

        for (let i = 0; i < 3; i++) {
            let tempData = JSON.parse(JSON.stringify(data));
            tempData.frames = miješajKljučeve(tempData.frames);

            reels.push(tempData)
        }

        res.json(reels);
    } catch (error) {
        console.error("Error: ", error);
    }
});

module.exports = {
    getReel
}

function miješajKljučeve(frames) {
    var shuffledFrames = {};
    var keys = Object.keys(frames);
    keys.sort(() => Math.random() - 0.5);

    for (var i = 0; i < 5; i++) {
        shuffledFrames[keys[i]] = frames[keys[i]];
    }

    return shuffledFrames;
}