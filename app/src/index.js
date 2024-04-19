// Configs
import { SYMBOL_SIZE } from "../configs/constants";

// Utils
import { initAppication } from "./utils/initApplication";
import { lerp } from "./utils/lerp";
import { backout } from "./utils/backout";

// Scenes
import { createSlotScene } from "./scenes/slotScene";

// Objects
import { createNoConnectionText } from "./objects/noConnectionText";
import { createSymbols, updateSymbols } from "./objects/symbols";
import { createWinningSymbols } from "./objects/winningSymbols";
import { createReels } from "./objects/reels";
import { createSpinButton } from "./objects/spinButton";
import { createWinningText } from "./objects/winningText";

// Sound
import { sound } from "@pixi/sound";
import slotAudio from './../assets/audio/slot.mp3';

(async () => {
    const app = await initAppication();

    createNoConnectionText(app);

    sound.add('slot-audio', slotAudio);

    const gameSprite = await createSlotScene(app);

    let symbolsSheet = await createSymbols();

    const winSheets = await createWinningSymbols();

    const reels = createReels(app, symbolsSheet);

    const spinButton = createSpinButton(gameSprite);

    const lowWinText = createWinningText("YOU WON 50$!", gameSprite);
    const bigWinText = createWinningText("YOU WON 100$!", gameSprite);

    ////////////// Game //////////////

    spinButton.eventMode = 'static';
    spinButton.cursor = 'pointer';
    spinButton.addListener('pointerdown', () => {
        startSpin();
    });

    let clicked = false;
    let spinning = false;

    async function startSpin() {
        if (spinning) return;

        symbolsSheet = await updateSymbols();

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

            tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
        }
    }

    function reelsComplete() {
        console.log('FINISHED SPINNING')
        spinning = false;
        sound.stop('slot-audio');
    }

    let lastLogTime = Date.now();
    let anim = false;

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
                    const tag = 'P_' + (Math.floor(Math.random() * 2) + 1);
                    s.texture = symbolsSheet.textures[tag];
                    r.tags[j] = tag;

                    s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width * 1.5, SYMBOL_SIZE / s.texture.height * 1.5);
                    s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
                }
            }
        }

        if (clicked && !spinning) {
            const currentTime = Date.now();
            const sameTags = reels[0].tags[2] == reels[1].tags[2];
            const allSameTags = sameTags && reels[0].tags[2] == reels[2].tags[2];
            const tagIndex = parseInt(reels[0].tags[2].split('_')[1]) - 1;

            if (currentTime - lastLogTime >= 250) {
                lastLogTime = currentTime;
                anim = !anim;
            }

            if (allSameTags) {
                console.log(">>>>> BIGGER WIN <<<<<");
                bigWinText.visible = true;
            } else if (sameTags) {
                console.log(">>>>> LESS WIN <<<<<");
                lowWinText.visible = true;
            } else {
                console.log("TRY AGAIN!");
            }


            if (allSameTags || sameTags) {
                const textureKey = `P_${tagIndex + 1}_${anim ? 'B' : 'A'}`;

                for (let i = 0; i < 2 + (allSameTags ? 1 : 0); i++) {
                    const texture = winSheets[tagIndex].textures[textureKey];
                    reels[i].symbols[2].texture = texture;
                }
            }
        }
    });

    const tweening = [];

    function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
        const tween = {
            object,
            property,
            propertyBeginValue: object[property],
            target,
            easing,
            time,
            change: onchange,
            complete: oncomplete,
            start: Date.now(),
        };

        tweening.push(tween);

        return tween;
    }

    app.ticker.add(() => {
        const now = Date.now();
        const remove = [];

        for (let i = 0; i < tweening.length; i++) {
            const t = tweening[i];
            const phase = Math.min(1, (now - t.start) / t.time);

            t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
            if (t.change) t.change(t);
            if (phase === 1) {
                t.object[t.property] = t.target;
                if (t.complete) t.complete(t);
                remove.push(t);
            }
        }
        for (let i = 0; i < remove.length; i++) {
            tweening.splice(tweening.indexOf(remove[i]), 1);
        }
    })
})();