import { BlurFilter, Container, Graphics, Sprite } from "pixi.js";
import { REEL_WIDTH, SYMBOL_SIZE } from "../../configs/constants";

export function createReels(app, symbolsSheet) {
    const reels = [];
    const reelContainer = new Container();

    for (let i = 0; i < 3; i++) {
        const rc = new Container();

        rc.x = i * REEL_WIDTH;
        reelContainer.addChild(rc);

        const reel = {
            container: rc,
            symbols: [],
            tags: [],
            position: 0,
            previousPosition: 0,
            blur: new BlurFilter()
        };

        reel.blur.blurX = 0;
        reel.blur.blurY = 0;
        rc.filters = [reel.blur];

        for (let j = 0; j < 4; j++) {
            const tag = 'P_' + (Math.floor(Math.random() * 9) + 1);
            const symbol = new Sprite(symbolsSheet.textures[tag]);

            symbol.y = j * SYMBOL_SIZE;
            symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width * 1.5, SYMBOL_SIZE / symbol.height * 1.5);
            symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);

            reel.tags.push(tag);
            reel.symbols.push(symbol);
            rc.addChild(symbol);
        }

        reels.push(reel);
    }

    app.stage.addChild(reelContainer);

    const margin = (app.screen.height - SYMBOL_SIZE * 3) / 2;
    reelContainer.y = margin;
    reelContainer.x = Math.round(app.screen.width / 2 - (REEL_WIDTH * 1.3));

    const mask = new Graphics().fill(0xFFFFFF).rect(-20, -20, 900, 495).fill();
    reelContainer.mask = mask;
    reelContainer.addChild(mask);

    return reels;
}