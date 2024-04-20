import { Graphics, Text } from "pixi.js";
import { COLOR_BLACK, COLOR_ORANGE } from "../../configs/constants";

export function createSpinButton(gameSprite) {
    const spinButton = new Graphics()
        .roundRect(0, 0, 220, 60, 20)
        .fill(COLOR_BLACK)
        .stroke({ color: COLOR_ORANGE, width: 2 });

    spinButton.x = -spinButton.width / 2;
    spinButton.y = gameSprite.height / 2.3;
    gameSprite.addChild(spinButton);

    const spinText = new Text({
        text: 'SPIN!',
        style: {
            fontFamily: 'Arial',
            fontSize: 45,
            fontWeight: 900,
            fill: COLOR_ORANGE,
            align: 'center',
        }
    });

    spinText.anchor.set(0.5);
    spinText.x = spinButton.width / 2;
    spinText.y = spinButton.height / 2;
    spinButton.addChild(spinText);

    return spinButton;
}