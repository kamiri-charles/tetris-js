import { globals, detect_block_collision, x_dist, y_dist} from "../utils.js";
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
		this.fall_speed = globals.FALL_SPEED;
		
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
	
	move_right(fallen_blocks = []) {
		let move = true;

		// Check board boundaries
		for (const block of this.blocks) {
			if (block.right + this.speed > this.board.right) {
				move = false;
				return;
			}
		}

		// Check for collision with surface tetros
		for (let i = 0; i < this.blocks.length; i++) {
			for (let j = 0; j < fallen_blocks.length; j++) {
				let x_offset = x_dist(this.blocks[i], fallen_blocks[j]);
				let y_offset = y_dist(this.blocks[i], fallen_blocks[j]);
				if (y_offset == 0 && x_offset == 0 && this.blocks[i].right <= fallen_blocks[j].left) {
					move = false;
					return;
				}
			}
		}

		if (move) this.x += this.speed;
	}

	move_left(fallen_blocks = []) {
		let move = true;

		// Check board boundaries
		for (const block of this.blocks) {
			if (block.x - this.speed < this.board.left) {
				move = false;
				return;
			}
		}

		// Check for collision with surface tetros
		for (let i = 0; i < this.blocks.length; i++) {
			for (let j = 0; j < fallen_blocks.length; j++) {
				let x_offset = x_dist(this.blocks[i], fallen_blocks[j]);
				let y_offset = y_dist(this.blocks[i], fallen_blocks[j]);
				if (y_offset == 0 && x_offset == 0 && this.blocks[i].left >= fallen_blocks[j].right) {
					move = false;
					return;
				}
			}
		}

		if (move) this.x -= this.speed;
	}

	rotate() {
		this.current_rotation++;
	}
	
	fall() {
		if (!this.reached_bottom) this.y += this.fall_speed;
	}
	
	update(fallen_blocks) {
		this.blocks = [];

		this.generate_blocks();

		if (this.current_rotation > this.max_rotations) {
			this.current_rotation = 0;
		};
				
		// Vertical and horizontal boundaries;
		for (let i = 0; i < this.blocks.length; i++) {
			if (this.blocks[i].bottom >= this.board.bottom) {
				this.reached_bottom = true;

				// Offset to the top if they cross the bottom border
				if (this.blocks[i].bottom > this.board.bottom) {
					let offset = this.blocks[i].bottom - this.board.bottom;

					this.blocks.forEach(block => {
						block.y -= offset;
						block.update();
					});
				}
			};

			if (this.blocks[i].x < this.board.x) {
				this.x += this.speed;
			};

			if (this.blocks[i].x + this.blocks[i].width > this.board.x + this.board.width) {
				this.x -= this.speed;
			};
		};
					
		// Check if the current tetro is colliding with bottom blocks
		if (!this.reached_bottom) {
			for (let x = 0; x < this.blocks.length; x++) {
				for (let y = 0; y < fallen_blocks.length; y++) {
					if (detect_block_collision(this.blocks[x], fallen_blocks[y])) {
						this.reached_bottom = true;							
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