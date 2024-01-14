import { globals } from "../utils.js";

export default class Block {
    constructor({x, y, color = 'black'}) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = globals.BLOCK_SIZE;
        this.height = globals.BLOCK_SIZE;
        this.top = this.y;
        this.bottom = this.y + this.height;
        this.left = this.x;
        this.right = this.x + this.width;
        this.marked_for_deletion = false;
    }

    update() {
        this.top = this.y;
		this.bottom = this.y + this.height;
		this.left = this.x;
		this.right = this.x + this.width;
    }

    render(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height)
    }
};