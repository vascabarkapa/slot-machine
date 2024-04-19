import { Text } from "pixi.js";
import { COLOR_RED } from "../../configs/constants";

export function createInformationText(text, app) {
    const informationText = new Text({
        text: text,
        style: {
            fontFamily: 'Arial',
            fontSize: 20,
            fontWeight: 900,
            fill: COLOR_RED,
            align: 'center',
        }
    });

    informationText.anchor.set(0.5);
    informationText.x = app.screen.width / 2;
    informationText.y = app.screen.height / 2;
    app.stage.addChild(informationText);
}