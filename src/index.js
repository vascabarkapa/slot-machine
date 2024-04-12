import { Application, Assets, Graphics, Rectangle, Sprite, Text, Texture } from "pixi.js";

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

    const obj = new Graphics()
        .roundRect(0, 0, 200, 50, 20)
        .fill('#000000');

    obj.x = app.screen.width / 2 - 100;
    obj.y = app.screen.height - 75;
    app.stage.addChild(obj);

    const spinText = new Text({
        text: 'SPIN!',
        style: {
            fontFamily: 'Arial',
            fontSize: 40,
            fontWeight: 900,
            fill: 'orange',
            align: 'center',
        }
    });

    spinText.anchor.set(0.5);
    spinText.x = app.screen.width / 2;
    spinText.y = app.screen.height - 50;
    app.stage.addChild(spinText);
})();