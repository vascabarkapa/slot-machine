import { Application, Assets, BlurFilter, Container, Graphics, Rectangle, Sprite, Spritesheet, Text, Texture } from "pixi.js";

import gamePng from './sprites/GAME.png';
import symPng from './sprites/SYM.png';
import p1Png from './sprites/P_1.png';
import p2Png from './sprites/P_2.png';
import p3Png from './sprites/P_3.png';
import p4Png from './sprites/P_4.png';
import p5Png from './sprites/P_5.png';
import p6Png from './sprites/P_6.png';
import p7Png from './sprites/P_7.png';
import p8Png from './sprites/P_8.png';
import p9Png from './sprites/P_9.png';

(async () => {
    const REEL_WIDTH = 300;
    const SYMBOL_SIZE = 170;
    const COLOR_BLACK = '#000000';
    const COLOR_ORANGE = '#FFA500';

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
    const symData = {
        frames: {
            P_1: {
                frame: {
                    x: 1,
                    y: 1,
                    w: 177,
                    h: 176
                },
                rotated: false,
                trimmed: true,
                spriteSourceSize: {
                    x: 95,
                    y: 23,
                    w: 177,
                    h: 176
                },
                sourceSize: {
                    w: 367,
                    h: 222
                }
            },
            P_2: {
                frame: {
                    x: 180,
                    y: 1,
                    w: 177,
                    h: 176
                },
                rotated: false,
                trimmed: true,
                spriteSourceSize: {
                    x: 95,
                    y: 23,
                    w: 177,
                    h: 176
                },
                sourceSize: {
                    w: 367,
                    h: 222
                }
            },
            P_3: {
                frame: {
                    x: 359,
                    y: 1,
                    w: 177,
                    h: 176
                },
                rotated: false,
                trimmed: true,
                spriteSourceSize: {
                    x: 95,
                    y: 23,
                    w: 177,
                    h: 176
                },
                sourceSize: {
                    w: 367,
                    h: 222
                }
            },
            P_4: {
                frame: {
                    x: 538,
                    y: 1,
                    w: 177,
                    h: 176
                },
                rotated: false,
                trimmed: true,
                spriteSourceSize: {
                    x: 95,
                    y: 23,
                    w: 177,
                    h: 176
                },
                sourceSize: {
                    w: 367,
                    h: 222
                }
            },
            P_5: {
                frame: {
                    x: 717,
                    y: 1,
                    w: 177,
                    h: 176
                },
                rotated: false,
                trimmed: true,
                spriteSourceSize: {
                    x: 95,
                    y: 23,
                    w: 177,
                    h: 176
                },
                sourceSize: {
                    w: 367,
                    h: 222
                }
            },
            P_6: {
                frame: {
                    x: 1,
                    y: 179,
                    w: 177,
                    h: 176
                },
                rotated: true,
                trimmed: true,
                spriteSourceSize: {
                    x: 95,
                    y: 23,
                    w: 177,
                    h: 176
                },
                sourceSize: {
                    w: 367,
                    h: 222
                }
            },
            P_7: {
                frame: {
                    x: 1,
                    y: 358,
                    w: 177,
                    h: 176
                },
                rotated: true,
                trimmed: true,
                spriteSourceSize: {
                    x: 95,
                    y: 23,
                    w: 177,
                    h: 176
                },
                sourceSize: {
                    w: 367,
                    h: 222
                }
            },
            P_8: {
                frame: {
                    x: 1,
                    y: 537,
                    w: 177,
                    h: 176
                },
                rotated: true,
                trimmed: true,
                spriteSourceSize: {
                    x: 95,
                    y: 23,
                    w: 177,
                    h: 176
                },
                sourceSize: {
                    w: 367,
                    h: 222
                }
            },
            P_9: {
                frame: {
                    x: 1,
                    y: 716,
                    w: 177,
                    h: 176
                },
                rotated: true,
                trimmed: true,
                spriteSourceSize: {
                    x: 95,
                    y: 23,
                    w: 177,
                    h: 176
                },
                sourceSize: {
                    w: 367,
                    h: 222
                }
            }
        },
        meta: {
            app: "https://www.codeandweb.com/texturepacker",
            version: "1.0",
            image: "SYM.png",
            format: "RGBA8888",
            size: {
                w: 1024,
                h: 1024
            },
            scale: "1",
            smartupdate: "$TexturePacker:SmartUpdate:12b4a6fef4222877e3064342aaa0b152:9eba638e645aec6d7b29ed8dc87ad9ad:7f439f11c904196e4d223ad99049b174$"
        }
    };

    // Symbol sheet
    const symAsset = await Assets.load(symPng);
    const symTexture = new Texture(symAsset);

    const sheet = new Spritesheet(symTexture, symData);
    await sheet.parse();

    const pData = {
        frames: {
            P_1_A: {
                frame: {
                    x: 234,
                    y: 1,
                    w: 177,
                    h: 176
                },
                rotated: false,
                trimmed: true,
                spriteSourceSize: {
                    x: 95,
                    y: 23,
                    w: 177,
                    h: 176
                },
                sourceSize: {
                    w: 367,
                    h: 222
                }
            },
            P_1_B: {
                frame: {
                    x: 1,
                    y: 1,
                    w: 231,
                    h: 222
                },
                rotated: false,
                trimmed: true,
                spriteSourceSize: {
                    x: 69,
                    y: 0,
                    w: 231,
                    h: 222
                },
                sourceSize: {
                    w: 367,
                    h: 222
                }
            }
        },
        meta: {
            app: "https://www.codeandweb.com/texturepacker",
            version: "1.0",
            image: "P_1.png",
            format: "RGBA8888",
            size: {
                w: 512,
                h: 512
            },
            scale: "1",
            smartupdate: "$TexturePacker:SmartUpdate:c41ec57f7d52e1f75de41de1256e791e:8e4bb469f69dd094586553143bdd2ff8:efc1861a7d39cbad229d9cbb8d943c2f$"
        }
    };

    // P1 sheet
    const p1Asset = await Assets.load(p1Png);
    const p1Texture = new Texture(p1Asset);

    const p1Sheet = new Spritesheet(p1Texture, pData);
    await p1Sheet.parse();

    // P2 sheet
    const p2Asset = await Assets.load(p2Png);
    const p2Texture = new Texture(p2Asset);

    const p2Sheet = new Spritesheet(p2Texture, pData);
    await p2Sheet.parse();

    // P3 sheet
    const p3Asset = await Assets.load(p3Png);
    const p3Texture = new Texture(p3Asset);

    const p3Sheet = new Spritesheet(p3Texture, pData);
    await p3Sheet.parse();

    // P4 sheet
    const p4Asset = await Assets.load(p4Png);
    const p4Texture = new Texture(p4Asset);

    const p4Sheet = new Spritesheet(p4Texture, pData);
    await p4Sheet.parse();

    // P5 sheet
    const p5Asset = await Assets.load(p5Png);
    const p5Texture = new Texture(p5Asset);

    const p5Sheet = new Spritesheet(p5Texture, pData);
    await p5Sheet.parse();

    // P6 sheet
    const p6Asset = await Assets.load(p6Png);
    const p6Texture = new Texture(p6Asset);

    const p6Sheet = new Spritesheet(p6Texture, pData);
    await p6Sheet.parse();

    // P7 sheet
    const p7Asset = await Assets.load(p7Png);
    const p7Texture = new Texture(p7Asset);

    const p7Sheet = new Spritesheet(p7Texture, pData);
    await p7Sheet.parse();

    // P8 sheet
    const p8Asset = await Assets.load(p8Png);
    const p8Texture = new Texture(p8Asset);

    const p8Sheet = new Spritesheet(p8Texture, pData);
    await p8Sheet.parse();

    // P9 sheet
    const p9Asset = await Assets.load(p9Png);
    const p9Texture = new Texture(p9Asset);

    const p9Sheet = new Spritesheet(p9Texture, pData);
    await p9Sheet.parse();

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
        .roundRect(0, 0, 200, 50, 20)
        .fill(COLOR_BLACK)
        .stroke({ color: COLOR_ORANGE, width: 2 });

    spinButton.x = app.screen.width / 2 - 100;
    spinButton.y = app.screen.height - 90;
    app.stage.addChild(spinButton);

    const spinText = new Text({
        text: 'SPIN!',
        style: {
            fontFamily: 'Arial',
            fontSize: 40,
            fontWeight: 900,
            fill: COLOR_ORANGE,
            align: 'center',
        }
    });

    spinText.anchor.set(0.5);
    spinText.x = spinButton.width / 2;
    spinText.y = spinButton.height / 2;
    spinButton.addChild(spinText);

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
        console.log('STARTED SPINNING')

        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            const extra = i;
            const target = r.position + 50 + i * 5 + extra;
            const time = 1500 + i * 600 + extra * 600;

            tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
        }
    }

    function reelsComplete() {
        console.log('FINISHED SPINNING')
        spinning = false;
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
                    const tag = 'P_' + (Math.floor(Math.random() * 9) + 1);
                    s.texture = sheet.textures[tag];

                    r.tags.unshift(tag);
                    if (r.tags.length > 4) {
                        r.tags.pop();
                    }

                    s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width * 1.5, SYMBOL_SIZE / s.texture.height * 1.5);
                    s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
                }
            }
        }

/*         setInterval(() => {
            // Ovdje možeš zamijeniti "Nešto što želiš ispisati" sa svojim stringom
            console.log("Nešto što želiš ispisati");
        }, 1000); */


        if (clicked && !spinning) {
            if (reels[0].tags[2] == reels[1].tags[2] && reels[0].tags[2] == reels[2].tags[2]) {
                console.log(">>>>> VEĆI DOBITAK <<<<<");
            } else if (reels[0].tags[2] == reels[1].tags[2] || reels[0].tags[2] == reels[2].tags[2] || reels[1].tags[2] == reels[2].tags[2]) {
                console.log(">>>>> MANJI DOBITAK <<<<<");
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