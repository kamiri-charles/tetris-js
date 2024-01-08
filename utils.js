export const globals = {
	CANVAS_WIDTH: window.innerWidth,
	CANVAS_HEIGHT: window.innerHeight,
	BOARD_WIDTH: 400,
	BOARD_HEIGHT: window.innerHeight - 100,
	BLOCK_SIZE: 20,
};


export const detect_block_collision = (block_1, block_2) => (
	block_1.y + block_1.height > block_2.y &&
	block_1.x < block_2.x + block_2.width &&
	block_1.x + block_1.width > block_2.x
);


export const in_y_range = (block_1, block_2) => (
	(block_1.y > block_2.y && block_1.y < block_2.y + block_2.height) ||
	(block_1.y + block_1.height > block_2.y && block_1.y + block_1.height < block_2.y + block_2.height)
);
