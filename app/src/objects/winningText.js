import { Text } from "pixi.js";
import { COLOR_ORANGE } from "../../configs/constants";

export function createWinningText(text, gameSprite) {
    const winText = new Text({
        text: text,
        style: {
            fontFamily: 'Arial',
            fontSize: 45,
            fontWeight: 900,
            fill: COLOR_ORANGE,
            align: 'center',
        }
    });

    winText.anchor.set(0.5);
    winText.x = 0;
    winText.y = -winText.height * 8.5;
    gameSprite.addChild(winText);
    winText.visible = false;

    return winText;
}