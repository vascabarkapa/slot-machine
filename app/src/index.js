import { Application, Assets, BlurFilter, Container, Graphics, Rectangle, Sprite, Spritesheet, Text, Texture } from "pixi.js";

import gamePng from './../assets/images/GAME.png';
import symPng from './../assets/images/SYM.png';
import p1Png from './../assets/images/P_1.png';
import p2Png from './../assets/images/P_2.png';
import p3Png from './../assets/images/P_3.png';
import p4Png from './../assets/images/P_4.png';
import p5Png from './../assets/images/P_5.png';
import p6Png from './../assets/images/P_6.png';
import p7Png from './../assets/images/P_7.png';
import p8Png from './../assets/images/P_8.png';
import p9Png from './../assets/images/P_9.png';

(async () => {
    const REEL_WIDTH = 300;
    const SYMBOL_SIZE = 170;
    const COLOR_BLACK = '#000000';
    const COLOR_ORANGE = '#FFA500';
    const API_URL = 'http://localhost:5000';

    // Init App
    const app = new Application();
    await app.init({ background: COLOR_BLACK, resizeTo: window });
    document.body.appendChild(app.canvas);

    // Background
    const gameAsset = await Assets.load(gamePng);
    const gameTexture = new Texture({ source: gameAsset, frame: new Rectangle(0, 0, 2048, 1024) });

    const gameSprite = new Sprite(gameTexture);
    gameSprite.scale = 0.75
    app.stage.addChild(gameSprite);

    gameSprite.anchor.set(0.5);
    gameSprite.x = app.screen.width / 2;
    gameSprite.y = app.screen.height / 2;

    // Symbols Data
    const symbolsResponse = await fetch(API_URL + "/reel");
    if (!symbolsResponse.ok) {
        throw new Error('Network response was not ok');
    }
    const responseSymbolsData = await symbolsResponse.json();
    const symData = responseSymbolsData;

    // Symbol sheet
    const symAsset = await Assets.load(symPng);
    const symTexture = new Texture(symAsset);

    const sheet = new Spritesheet(symTexture, symData);
    await sheet.parse();

    // Win Data
    const winResponse = await fetch(API_URL + "/win");
    if (!symbolsResponse.ok) {
        throw new Error('Network response was not ok');
    }
    const responseWinData = await winResponse.json();
    const winData = responseWinData;

    const winSheets = [];
    const imageObjects = { p1: p1Png, p2: p2Png, p3: p3Png, p4: p4Png, p5: p5Png, p6: p6Png, p7: p7Png, p8: p8Png, p9: p9Png };

    for (let i = 1; i <= 9; i++) {
        const imageName = `p${i}`;
        const winAsset = await Assets.load(imageObjects[imageName]);
        const winTexture = new Texture(winAsset);
        const winSheet = new Spritesheet(winTexture, winData[i - 1]);
        await winSheet.parse();
        winSheets.push(winSheet);
    }

    const reels = [];
    const reelContainer = new Container();

    // Reels
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
            const symbol = new Sprite(sheet.textures[tag]);

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

    // Mask
    const mask = new Graphics().fill(0xFFFFFF).rect(-20, -20, 900, 495).fill();

    reelContainer.mask = mask;
    reelContainer.addChild(mask);

    // Spin button
    const spinButton = new Graphics()
        .roundRect(0, 0, 220, 60, 20)
        .fill(COLOR_BLACK)
        .stroke({ color: COLOR_ORANGE, width: 2 });

    spinButton.x = -spinButton.width / 2;
    spinButton.y = gameSprite.height / 2;
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

    // Low win text
    const lowWinText = new Text({
        text: 'YOU WON 50$!',
        style: {
            fontFamily: 'Arial',
            fontSize: 45,
            fontWeight: 900,
            fill: COLOR_ORANGE,
            align: 'center',
        }
    });

    lowWinText.anchor.set(0.5);
    lowWinText.x = 0;
    lowWinText.y = -lowWinText.height * 8.5;
    gameSprite.addChild(lowWinText);
    lowWinText.visible = false;

    // Big win text
    const bigWinText = new Text({
        text: 'YOU WON 100$!',
        style: {
            fontFamily: 'Arial',
            fontSize: 45,
            fontWeight: 900,
            fill: COLOR_ORANGE,
            align: 'center',
        }
    });

    bigWinText.anchor.set(0.5);
    bigWinText.x = 0;
    bigWinText.y = -bigWinText.height * 8.5;
    gameSprite.addChild(bigWinText);
    bigWinText.visible = false;

    ////////////// game //////////////

    spinButton.eventMode = 'static';
    spinButton.cursor = 'pointer';
    spinButton.addListener('pointerdown', () => {
        startSpin();
    });

    let clicked = false;
    let spinning = false;

    function startSpin() {
        if (spinning) return;
        spinning = true;
        clicked = true;

        lowWinText.visible = false;
        bigWinText.visible = false;

        console.log('STARTED SPINNING');

        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            const extra = i;
            const target = Math.ceil((r.position + 50 + i * 5 + extra) / 100) * 100;;
            const time = 1500 + i * 600 + extra * 600;

            tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
        }
    }

    function reelsComplete() {
        console.log('FINISHED SPINNING')
        spinning = false;
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
                    const tag = 'P_' + (Math.floor(Math.random() * 9) + 1);
                    s.texture = sheet.textures[tag];
                    r.tags[j] = tag;

                    s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width * 1.5, SYMBOL_SIZE / s.texture.height * 1.5);
                    s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
                }
            }
        }

        if (clicked && !spinning) {
            const currentTime = Date.now();

            if (currentTime - lastLogTime >= 250) {
                lastLogTime = currentTime;
                anim = !anim;
            }

            if (reels[0].tags[2] == reels[1].tags[2] && reels[0].tags[2] == reels[2].tags[2]) {
                console.log(">>>>> VEĆI DOBITAK <<<<<");
                bigWinText.visible = true;

                switch (reels[0].tags[2]) {
                    case 'P_1':
                        if (anim) {
                            reels[0].symbols[2].texture = winSheets[0].textures['P_1_B'];
                            reels[1].symbols[2].texture = winSheets[0].textures['P_1_B'];
                            reels[2].symbols[2].texture = winSheets[0].textures['P_1_B'];
                        } else {
                            reels[0].symbols[2].texture = winSheets[0].textures['P_1_A'];
                            reels[1].symbols[2].texture = winSheets[0].textures['P_1_A'];
                            reels[2].symbols[2].texture = winSheets[0].textures['P_1_A'];
                        }

                        break;
                    case 'P_2':
                        if (anim) {
                            reels[0].symbols[2].texture = winSheets[1].textures['P_2_B'];
                            reels[1].symbols[2].texture = winSheets[1].textures['P_2_B'];
                            reels[2].symbols[2].texture = winSheets[1].textures['P_2_B'];
                        } else {
                            reels[0].symbols[2].texture = winSheets[1].textures['P_2_A'];
                            reels[1].symbols[2].texture = winSheets[1].textures['P_2_A'];
                            reels[2].symbols[2].texture = winSheets[1].textures['P_2_A'];
                        }

                        break;
                    case 'P_3':
                        if (anim) {
                            reels[0].symbols[2].texture = winSheets[2].textures['P_3_B'];
                            reels[1].symbols[2].texture = winSheets[2].textures['P_3_B'];
                            reels[2].symbols[2].texture = winSheets[2].textures['P_3_B'];
                        } else {
                            reels[0].symbols[2].texture = winSheets[2].textures['P_3_A'];
                            reels[1].symbols[2].texture = winSheets[2].textures['P_3_A'];
                            reels[2].symbols[2].texture = winSheets[2].textures['P_3_A'];
                        }

                        break;
                    case 'P_4':
                        if (anim) {
                            reels[0].symbols[2].texture = winSheets[3].textures['P_4_B'];
                            reels[1].symbols[2].texture = winSheets[3].textures['P_4_B'];
                            reels[2].symbols[2].texture = winSheets[3].textures['P_4_B'];
                        } else {
                            reels[0].symbols[2].texture = winSheets[3].textures['P_4_A'];
                            reels[1].symbols[2].texture = winSheets[3].textures['P_4_A'];
                            reels[2].symbols[2].texture = winSheets[3].textures['P_4_A'];
                        }

                        break;
                    case 'P_5':
                        if (anim) {
                            reels[0].symbols[2].texture = winSheets[4].textures['P_5_B'];
                            reels[1].symbols[2].texture = winSheets[4].textures['P_5_B'];
                            reels[2].symbols[2].texture = winSheets[4].textures['P_5_B'];
                        } else {
                            reels[0].symbols[2].texture = winSheets[4].textures['P_5_A'];
                            reels[1].symbols[2].texture = winSheets[4].textures['P_5_A'];
                            reels[2].symbols[2].texture = winSheets[4].textures['P_5_A'];
                        }

                        break;
                    case 'P_6':
                        if (anim) {
                            reels[0].symbols[2].texture = winSheets[5].textures['P_6_B'];
                            reels[1].symbols[2].texture = winSheets[5].textures['P_6_B'];
                            reels[2].symbols[2].texture = winSheets[5].textures['P_6_B'];
                        } else {
                            reels[0].symbols[2].texture = winSheets[5].textures['P_6_A'];
                            reels[1].symbols[2].texture = winSheets[5].textures['P_6_A'];
                            reels[2].symbols[2].texture = winSheets[5].textures['P_6_A'];
                        }

                        break;
                    case 'P_7':
                        if (anim) {
                            reels[0].symbols[2].texture = winSheets[6].textures['P_7_B'];
                            reels[1].symbols[2].texture = winSheets[6].textures['P_7_B'];
                            reels[2].symbols[2].texture = winSheets[6].textures['P_7_B'];
                        } else {
                            reels[0].symbols[2].texture = winSheets[6].textures['P_7_A'];
                            reels[1].symbols[2].texture = winSheets[6].textures['P_7_A'];
                            reels[2].symbols[2].texture = winSheets[6].textures['P_7_A'];
                        }

                        break;
                    case 'P_8':
                        if (anim) {
                            reels[0].symbols[2].texture = winSheets[7].textures['P_8_B'];
                            reels[1].symbols[2].texture = winSheets[7].textures['P_8_B'];
                            reels[2].symbols[2].texture = winSheets[7].textures['P_8_B'];
                        } else {
                            reels[0].symbols[2].texture = winSheets[7].textures['P_8_A'];
                            reels[1].symbols[2].texture = winSheets[7].textures['P_8_A'];
                            reels[2].symbols[2].texture = winSheets[7].textures['P_8_A'];
                        }

                        break;
                    case 'P_9':
                        if (anim) {
                            reels[0].symbols[2].texture = winSheets[8].textures['P_9_B'];
                            reels[1].symbols[2].texture = winSheets[8].textures['P_9_B'];
                            reels[2].symbols[2].texture = winSheets[8].textures['P_9_B'];
                        } else {
                            reels[0].symbols[2].texture = winSheets[8].textures['P_9_A'];
                            reels[1].symbols[2].texture = winSheets[8].textures['P_9_A'];
                            reels[2].symbols[2].texture = winSheets[8].textures['P_9_A'];
                        }

                        break;
                }
            } else if (reels[0].tags[2] == reels[1].tags[2]) {
                console.log(">>>>> MANJI DOBITAK <<<<<  ");
                lowWinText.visible = true;

                switch (reels[0].tags[2]) {
                    case 'P_1':
                        if (anim) {
                            reels[0].symbols[2].texture = winSheets[0].textures['P_1_B'];
                            reels[1].symbols[2].texture = winSheets[0].textures['P_1_B'];
                        } else {
                            reels[0].symbols[2].texture = winSheets[0].textures['P_1_A'];
                            reels[1].symbols[2].texture = winSheets[0].textures['P_1_A'];
                        }

                        break;
                    case 'P_2':
                        if (anim) {
                            reels[0].symbols[2].texture = winSheets[1].textures['P_2_B'];
                            reels[1].symbols[2].texture = winSheets[1].textures['P_2_B'];
                        } else {
                            reels[0].symbols[2].texture = winSheets[1].textures['P_2_A'];
                            reels[1].symbols[2].texture = winSheets[1].textures['P_2_A'];
                        }

                        break;
                    case 'P_3':
                        if (anim) {
                            reels[0].symbols[2].texture = winSheets[2].textures['P_3_B'];
                            reels[1].symbols[2].texture = winSheets[2].textures['P_3_B'];
                        } else {
                            reels[0].symbols[2].texture = winSheets[2].textures['P_3_A'];
                            reels[1].symbols[2].texture = winSheets[2].textures['P_3_A'];
                        }

                        break;
                    case 'P_4':
                        if (anim) {
                            reels[0].symbols[2].texture = winSheets[3].textures['P_4_B'];
                            reels[1].symbols[2].texture = winSheets[3].textures['P_4_B'];
                        } else {
                            reels[0].symbols[2].texture = winSheets[3].textures['P_4_A'];
                            reels[1].symbols[2].texture = winSheets[3].textures['P_4_A'];
                        }

                        break;
                    case 'P_5':
                        if (anim) {
                            reels[0].symbols[2].texture = winSheets[4].textures['P_5_B'];
                            reels[1].symbols[2].texture = winSheets[4].textures['P_5_B'];
                        } else {
                            reels[0].symbols[2].texture = winSheets[4].textures['P_5_A'];
                            reels[1].symbols[2].texture = winSheets[4].textures['P_5_A'];
                        }

                        break;
                    case 'P_6':
                        if (anim) {
                            reels[0].symbols[2].texture = winSheets[5].textures['P_6_B'];
                            reels[1].symbols[2].texture = winSheets[5].textures['P_6_B'];
                        } else {
                            reels[0].symbols[2].texture = winSheets[5].textures['P_6_A'];
                            reels[1].symbols[2].texture = winSheets[5].textures['P_6_A'];
                        }

                        break;
                    case 'P_7':
                        if (anim) {
                            reels[0].symbols[2].texture = winSheets[6].textures['P_7_B'];
                            reels[1].symbols[2].texture = winSheets[6].textures['P_7_B'];
                        } else {
                            reels[0].symbols[2].texture = winSheets[6].textures['P_7_A'];
                            reels[1].symbols[2].texture = winSheets[6].textures['P_7_A'];
                        }

                        break;
                    case 'P_8':
                        if (anim) {
                            reels[0].symbols[2].texture = winSheets[7].textures['P_8_B'];
                            reels[1].symbols[2].texture = winSheets[7].textures['P_8_B'];
                        } else {
                            reels[0].symbols[2].texture = winSheets[7].textures['P_8_A'];
                            reels[1].symbols[2].texture = winSheets[7].textures['P_8_A'];
                        }

                        break;
                    case 'P_9':
                        if (anim) {
                            reels[0].symbols[2].texture = winSheets[8].textures['P_9_B'];
                            reels[1].symbols[2].texture = winSheets[8].textures['P_9_B'];
                        } else {
                            reels[0].symbols[2].texture = winSheets[8].textures['P_9_A'];
                            reels[1].symbols[2].texture = winSheets[8].textures['P_9_A'];
                        }

                        break;
                }
            } else {
                console.log("NEMA DOBITKA. POKUŠAJ PONOVO!");
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

    function lerp(a1, a2, t) {
        return a1 * (1 - t) + a2 * t;
    }

    function backout(amount) {
        return (t) => --t * t * ((amount + 1) * t + amount) + 1;
    }
})();