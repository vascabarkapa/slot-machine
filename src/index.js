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

    // Spin button
    const spinButton = new Graphics()
        .roundRect(0, 0, 200, 50, 20)
        .fill(COLOR_BLACK)
        .stroke({ color: COLOR_ORANGE, width: 2 });

    spinButton.x = app.screen.width / 2 - 100;
    spinButton.y = app.screen.height - 75;
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
        console.log('Spinning!!!')
    }
})();