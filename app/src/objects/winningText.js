import { Text } from "pixi.js";
import { COLOR_BLACK, COLOR_ORANGE } from "../../configs/constants";

export function createWinningText(text, app) {
    const winText = new Text({
        text: text,
        style: {
            fontFamily: 'Arial',
            fontSize: 45,
            fontWeight: 900,
            fill: COLOR_ORANGE,
            align: 'center',
            stroke: { color: COLOR_BLACK, width: 5 },
            dropShadow: {
                color: 0x000000,
                angle: Math.PI / 6,
                blur: 4,
                distance: 6,
            },
        }
    });

    winText.anchor.set(0.5);
    winText.x = app.screen.width / 2;
    winText.y = app.screen.height / 2;
    app.stage.addChild(winText);
    winText.visible = false;

    return winText;
}