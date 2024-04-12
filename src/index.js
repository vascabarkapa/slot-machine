import { Application } from "pixi.js";

(async () => {
    const COLOR_BLACK = '#000000'

    const app = new Application();
    await app.init({ background: COLOR_BLACK, resizeTo: window });
    document.body.appendChild(app.canvas);

})();