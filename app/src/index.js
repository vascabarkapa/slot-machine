// Configs
import { NUMBER_OF_SYMBOLS, SYMBOL_SIZE } from "../configs/constants";

// Scenes
import { createSlotScene } from "./scenes/slotScene";

// Objects
import { createNoConnectionText } from "./objects/noConnectionText";
import { getSymbols } from "./objects/symbols";
import { createWinningSymbols } from "./objects/winningSymbols";
import { createReels } from "./objects/reels";
import { createSpinButton } from "./objects/spinButton";
import { createWinningText } from "./objects/winningText";

// Utils
import { initAppication } from "./utils/initApplication";
import { backoutEasing } from "./utils/backoutEasing";
import { spinningAnimation } from "./utils/spinningAnimation";
import { tweening, tweenTo } from "./utils/twinning";
import { checkWin } from "./utils/checkWin";

// Sound
import { sound } from "@pixi/sound";
import slotAudio from './../assets/audio/slot.mp3';

(async () => {
    ////////////////// Initialization //////////////////

    const app = await initAppication();

    createNoConnectionText(app);

    sound.add('slot-audio', slotAudio);

    const gameSprite = await createSlotScene(app);

    let symbolsSheet = await getSymbols();

    const winSheets = await createWinningSymbols();

    const reels = createReels(app, symbolsSheet);

    const spinButton = createSpinButton(gameSprite);

    const lowWinText = createWinningText("YOU WON 50$!", gameSprite);
    const bigWinText = createWinningText("YOU WON 100$!", gameSprite);

    ////////////////// Game //////////////////

    let clicked = false;
    let spinning = false;
    let animateWin = false;
    let lastLogTime = Date.now();

    spinButton.eventMode = 'static';
    spinButton.cursor = 'pointer';
    spinButton.addListener('pointerdown', () => {
        startSpin();
    });

    async function startSpin() {
        if (spinning) return;
        symbolsSheet = await getSymbols();

        spinning = true;
        clicked = true;

        lowWinText.visible = false;
        bigWinText.visible = false;

        sound.play('slot-audio');
        console.log('STARTED SPINNING');

        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            const extra = i;
            const target = Math.ceil((r.position + 50 + i * 5 + extra) / 100) * 100;;
            const time = 3000 + i * 800;

            tweenTo(r, 'position', target, time, backoutEasing(0.5), null, i === reels.length - 1 ? reelsComplete : null);
        }
    }

    function reelsComplete() {
        spinning = false;
        console.log('FINISHED SPINNING')
        sound.stop('slot-audio');
    }

    app.ticker.add(() => {
        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];

            r.blur.blurY = (r.position - r.previousPosition) * 8;
            r.previousPosition = r.position;

            for (let j = 0; j < r.symbols.length; j++) {
                const s = r.symbols[j];
                const prevY = s.y;

                s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE - 20;

                if (s.y < 0 && prevY > SYMBOL_SIZE) {
                    const tag = 'P_' + (Math.floor(Math.random() * NUMBER_OF_SYMBOLS) + 1);
                    s.texture = symbolsSheet.textures[tag];
                    r.tags[j] = tag;

                    s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width * 1.5, SYMBOL_SIZE / s.texture.height * 1.5);
                    s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
                }
            }
        }

        if (clicked && !spinning) {
            const result = checkWin(lastLogTime, animateWin, bigWinText, lowWinText, reels, winSheets);

            lastLogTime = result.lastLogTime;
            animateWin = result.animateWin;
        }
    });

    spinningAnimation(app, tweening);
})();