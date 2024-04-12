import { Application, Assets, Container, Graphics, Rectangle, Sprite, Text, TextStyle, Texture } from "pixi.js";

import gamePng from './sprites/GAME.png';

(async () => {
    const COLOR_BLACK = '#000000'

    const app = new Application();
    await app.init({ background: COLOR_BLACK, resizeTo: window });
    document.body.appendChild(app.canvas);

    const gameAsset = await Assets.load(gamePng);
    const gameTexture = new Texture({ source: gameAsset, frame: new Rectangle(0, 0, 2048, 1024) });

    const gameSprite = new Sprite(gameTexture);
    gameSprite.scale = 0.75
    app.stage.addChild(gameSprite);

    gameSprite.anchor.set(0.5);
    gameSprite.x = app.screen.width / 2;
    gameSprite.y = app.screen.height / 2;
})();