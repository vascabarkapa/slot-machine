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

/**
 * @desc Return winning symbols
 * @access Public
 */
const getWinSymbols = asyncHandler(async (req, res) => {
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

/**
 * @desc Return initialization of game
 * @access Public
 */
const initGame = asyncHandler(async (req, res) => {
    try {
        const rawData = fs.readFileSync('./data/GAME.json');
        const data = JSON.parse(rawData);

        res.json(data);
    } catch (error) {
        console.error("Error: ", error);
    }
});

module.exports = {
    getReel,
    getWinSymbols,
    initGame
}