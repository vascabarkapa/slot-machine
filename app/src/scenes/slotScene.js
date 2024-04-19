import { Assets, Sprite, Spritesheet, Texture } from "pixi.js";
import { API_URL } from "../../configs/constants";
import { createInformationText } from "../objects/informationText";

import gamePng from './../../assets/sprites/GAME.png';

export async function createSlotScene(app) {
    try {
        const gameResponse = await fetch(API_URL + "/init");

        if (!gameResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const responseInitData = await gameResponse.json();
        const initData = responseInitData;

        const initAsset = await Assets.load(gamePng);
        const initTexture = new Texture(initAsset);

        const initSheet = new Spritesheet(initTexture, initData);
        await initSheet.parse();

        const gameSprite = new Sprite(initSheet.textures['game']);
        gameSprite.scale = 0.75
        app.stage.addChild(gameSprite);

        gameSprite.anchor.set(0.5);
        gameSprite.x = app.screen.width / 2;
        gameSprite.y = app.screen.height / 2;

        return gameSprite;
    } catch (error) {
        console.error('Connection error:', error);

        app.stage.removeChildren();
        createInformationText('Server error. Please check your network connection and try again!', app);

        setInterval(() => {
            location.reload();
        }, 3000);
    }
}
