import { globals, block_collision } from "../utils.js";
import Block from "./block.js";

export class Tetromino {
    constructor(shape) {
        this.shape = shape;
        this.x = 400;
        this.y = 0;
        this.color = 'black';
        this.current_rotation = 0;
        this.max_rotations = this.shape.length - 1;
        this.blocks = [];

        this.reached_bottom = false;
    }
    
    rotate() {
        this.current_rotation++;
    }

    fall() {
        this.y += 2;
    }

    update(surface_tetros) {
        this.blocks = [];
        if (this.current_rotation > this.max_rotations) {
            this.current_rotation = 0;
        };

        for (let i = 0; i < this.shape[this.current_rotation].length; i++) {
          for (let j = 0; j < this.shape[this.current_rotation][i].length; j++) {
              if (this.shape[this.current_rotation][i][j] === 1) {
                this.blocks.push(new Block(this.x + (j * globals.BLOCK_SIZE), this.y + (i*globals.BLOCK_SIZE)))
            }
          }
        };

        // Check if any blocks has reached the bottom
        for (let i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].y + this.blocks[i].size >= globals.BOARD_HEIGHT + 50) {
                this.reached_bottom = true;
            }
        }

        // Check if the current tetro is colliding with surface tetros
        if (!this.reached_bottom) {
            for (let i = 0; i < surface_tetros.length; i++) {
                for (let x = 0; x < this.blocks.length; x++) {
                    for (let y = 0; y < surface_tetros[i].blocks.length; y++) {
                        if (block_collision(this.blocks[x], surface_tetros[i].blocks[y])) {
                            this.reached_bottom = true;
                        }
                    }
                }
            }
        }

        

        if (!this.reached_bottom) {
            this.fall();
        }
    }


    render(context, surface_tetros) {
        this.update(surface_tetros);
        this.blocks.forEach(block => block.render(context));
    }
}