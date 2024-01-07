import { globals } from "../utils.js";

export default class Board {
    constructor() {
        this.width = globals.BOARD_WIDTH;
        this.height = globals.BOARD_HEIGHT;
        this.x = (globals.CANVAS_WIDTH * 0.5) - (this.width * 0.5);
        this.y = 50;
    }

    render(context) {
        context.beginPath();
        context.fillStyle = 'skyblue';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}