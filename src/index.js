import { Application, Assets, BlurFilter, Container, Graphics, Rectangle, Sprite, Spritesheet, Text, Texture } from "pixi.js";

import gamePng from './sprites/GAME.png';
import symPng from './sprites/SYM.png';

(async () => {
    const REEL_WIDTH = 300;
    const SYMBOL_SIZE = 200;
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

    const symAsset = await Assets.load(symPng);
    const symTexture = new Texture(symAsset);

    const sheet = new Spritesheet(symTexture, symData);
    await sheet.parse();

    const reels = [];
    const reelContainer = new Container();

    for (let i = 0; i < 3; i++) {
        const rc = new Container();

        rc.x = i * REEL_WIDTH;
        reelContainer.addChild(rc);

        const reel = {
            container: rc,
            symbols: [],
            position: 0,
            previousPosition: 0,
            blur: new BlurFilter()
        };

        reel.blur.blurX = 0;
        reel.blur.blurY = 0;
        rc.filters = [reel.blur];

        for (let j = 0; j < 4; j++) {
            const symbol = new Sprite(sheet.textures['P_' + (Math.floor(Math.random() * 9) + 1)]);
            symbol.y = j * SYMBOL_SIZE;
            symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
            symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);

            reel.symbols.push(symbol);
            rc.addChild(symbol);
        }

        reels.push(reel);
    }

    app.stage.addChild(reelContainer);

    const margin = (app.screen.height - SYMBOL_SIZE * 3) / 2;

    reelContainer.y = margin;
    reelContainer.x = Math.round(app.screen.width / 2 - (REEL_WIDTH * 1.3));









    const mask = new Graphics();
    mask.beginFill(0xFFFFFF);
    mask.drawRect(0, 0, 900, 500);
    mask.endFill();
    //reelContainer.mask = mask;


    //reelContainer.addChild(mask);








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

    let spinning = false;

    function startSpin() {
        if (spinning) return;
        spinning = true;

        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            const extra = Math.floor(Math.random() * 3);
            const target = r.position + 10 + i * 5 + extra;
            const time = 2500 + i * 600 + extra * 600;

            tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
        }
    }

    function reelsComplete() {
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

                s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;

                if (s.y < 0 && prevY > SYMBOL_SIZE) {
                    s.texture = sheet.textures['P_' + (Math.floor(Math.random() * 9) + 1)];
                    s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);
                    s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
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

    function lerp(a1, a2, t) {
        return a1 * (1 - t) + a2 * t;
    }

    function backout(amount) {
        return (t) => --t * t * ((amount + 1) * t + amount) + 1;
    }
})();