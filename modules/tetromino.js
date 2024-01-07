import { globals, detect_block_collision, in_y_range } from "../utils.js";
import Block from "./block.js";

export class Tetromino {
	constructor(board, shape) {
		this.board = board;
		this.shape = shape;
		this.color = shape[shape.length - 1].color;
		this.x = board.x + board.width / 2.5;
		this.y = 0;
		this.current_rotation = 0;
		this.max_rotations = shape.length - 2; // The last obj is the tetro color
		this.mov = 0;
		this.speed = 20;
		this.min_left_dist = 0;
		this.min_right_dist = 0;
		this.blocks = [];
		
		this.reached_bottom = false;
	}

	generate_blocks() {
		for (let i = 0; i < this.shape[this.current_rotation].length; i++) {
			for (let j = 0; j < this.shape[this.current_rotation][i].length; j++) {
				if (this.shape[this.current_rotation][i][j] === 1) {
					this.blocks.push(
						new Block({
							x: this.x + j * globals.BLOCK_SIZE,
							y: this.y + i * globals.BLOCK_SIZE,
							color: this.color
						})
					);
				}
			}
		};
	};
	
	move_right(surface_tetros = []) {
		let move = true;
		if (surface_tetros.length != 0) {
			surface_tetros.forEach(tetro => {
				for (let i = 0; i < this.blocks.length; i++) {
					for (let j = 0; j < tetro.blocks.length; j++) {
						let fut_x = this.blocks[i].x + this.blocks[i].width + this.speed;
						if (in_y_range(this.blocks[i], tetro.blocks[j]) && fut_x >= tetro.blocks[j].x) {
							move = false;
						}
					}
				}
			});
		};

		if (move) this.x += this.speed;
	}

	move_left(surface_tetros = []) {
		let move = true;
		if (surface_tetros.length != 0) {
			surface_tetros.forEach(tetro => {
				for (let i = 0; i < this.blocks.length; i++) {
					for (let j = 0; j < tetro.blocks.length; j++) {
						let fut_x = this.blocks[i].x - this.speed;
						if (in_y_range(this.blocks[i], tetro.blocks[j]) && fut_x <= tetro.blocks[j].x + tetro.blocks[j].width) {
							move = false;
						}
					}
				}
			});
		};

		if (move) this.x -= this.speed;
	}

	rotate() {
		this.current_rotation++;
	}
	
	fall() {
		if (!this.reached_bottom) this.y += 2;
	}
	
	update(surface_tetros) {
		this.blocks = [];

		this.generate_blocks();

		if (this.current_rotation > this.max_rotations) {
			this.current_rotation = 0;
		};
				
		// Check if any tetro-blocks has reached the bottom
		for (let i = 0; i < this.blocks.length; i++) {
			if (this.blocks[i].y + this.blocks[i].height >= globals.BOARD_HEIGHT + 50) {
					this.reached_bottom = true;
			}
		};
					
		// Check if the current tetro is colliding with surface tetros
		if (!this.reached_bottom) {
			for (let i = 0; i < surface_tetros.length; i++) {
				for (let x = 0; x < this.blocks.length; x++) {
					for (let y = 0; y < surface_tetros[i].blocks.length; y++) {
						if (detect_block_collision(this.blocks[x],surface_tetros[i].blocks[y])) {
							this.reached_bottom = true;							
						}
					}
				}
			}
		};
		
		this.fall();
	}
					
	render(context, surface_tetros) {
		this.update(surface_tetros);
		this.blocks.forEach(block => block.render(context));
	}
}