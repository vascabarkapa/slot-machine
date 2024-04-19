import { Text } from "pixi.js";
import { COLOR_RED } from "../../configs/constants";

export function createNoConnectionText(app) {
    const noConnectionText = new Text({
        text: 'Connection failed. Please check your network connection and try again.',
        style: {
            fontFamily: 'Arial',
            fontSize: 20,
            fontWeight: 900,
            fill: COLOR_RED,
            align: 'center',
        }
    });

    noConnectionText.anchor.set(0.5);
    noConnectionText.x = app.screen.width / 2;
    noConnectionText.y = app.screen.height / 2;
    app.stage.addChild(noConnectionText);
}