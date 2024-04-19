import { Application } from "pixi.js";
import { COLOR_BLACK } from "../../configs/constants";

export async function initAppication() {
    const app = new Application();
    await app.init({ background: COLOR_BLACK, resizeTo: window });
    document.body.appendChild(app.canvas);

    return app;
}