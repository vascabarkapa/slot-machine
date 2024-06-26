import { Assets, Spritesheet, Texture } from "pixi.js";
import { API_URL } from "../../configs/constants";
import { createInformationText } from "./informationText";

import symPng from './../../assets/sprites/SYM.png';

export async function getSymbols(app) {
    try {
        const symbolsResponse = await fetch(API_URL + "/reel");
        if (!symbolsResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const responseSymbolsData = await symbolsResponse.json();
        const symData = responseSymbolsData;

        const symAsset = await Assets.load(symPng);
        const symTexture = new Texture(symAsset);

        const symbolsSheet = new Spritesheet(symTexture, symData);
        await symbolsSheet.parse();

        return symbolsSheet;
    } catch (error) {
        console.error("Error fetching symbols:", error);
        
        app.stage.removeChildren();
        createInformationText('Server error. Please check your network connection and try again!', app);

        setInterval(() => {
            location.reload();
        }, 3000);
    }
}
