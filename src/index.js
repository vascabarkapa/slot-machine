import { Application } from "pixi.js";

(async () => {
    const BLUE_COLOR = '#1099bb'

    const app = new Application();
    await app.init({ background: BLUE_COLOR, resizeTo: window });
    document.body.appendChild(app.canvas);

})();