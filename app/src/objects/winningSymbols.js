import { Assets, Spritesheet, Texture } from "pixi.js";
import { API_URL } from "../../configs/constants";

import p1Png from './../../assets/sprites/P_1.png';
import p2Png from './../../assets/sprites/P_2.png';
import p3Png from './../../assets/sprites/P_3.png';
import p4Png from './../../assets/sprites/P_4.png';
import p5Png from './../../assets/sprites/P_5.png';
import p6Png from './../../assets/sprites/P_6.png';
import p7Png from './../../assets/sprites/P_7.png';
import p8Png from './../../assets/sprites/P_8.png';
import p9Png from './../../assets/sprites/P_9.png';

export async function createWinningSymbols() {
    const winSheets = [];
    const imageObjects = { p1: p1Png, p2: p2Png, p3: p3Png, p4: p4Png, p5: p5Png, p6: p6Png, p7: p7Png, p8: p8Png, p9: p9Png };

    const winResponse = await fetch(API_URL + "/win");

    if (!winResponse.ok) {
        throw new Error('Network response was not ok');
    }

    const responseWinData = await winResponse.json();
    const winData = responseWinData;

    for (let i = 1; i <= 9; i++) {
        const imageName = `p${i}`;
        const winAsset = await Assets.load(imageObjects[imageName]);
        const winTexture = new Texture(winAsset);
        const winSheet = new Spritesheet(winTexture, winData[i - 1]);
        await winSheet.parse();
        winSheets.push(winSheet);
    }

    return winSheets;
}