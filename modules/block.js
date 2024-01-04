import { globals } from "../utils.js";

export default class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = globals.BLOCK_SIZE;
    }

    render(context) {
        context.fillStyle = 'green';
        context.fillRect(this.x, this.y, this.size, this.size)
    }
};