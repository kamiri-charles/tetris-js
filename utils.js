export const globals = {
	CANVAS_WIDTH: window.innerWidth,
	CANVAS_HEIGHT: window.innerHeight,
	BOARD_WIDTH: 400,
	BOARD_HEIGHT: window.innerHeight - 100,
	BLOCK_SIZE: 20,
	FALL_SPEED: 1
};


// Utility functions
export const in_range = (flag, start, stop) => (
	flag > start && flag < stop
);

export const in_x_range = (block_1, block_2) => (
	in_range(block_1.left, block_2.left, block_2.right) ||
	in_range(block_1.left, block_2.left, block_2.right)
);

export const in_y_range = (block_1, block_2) => (
	in_range(block_1.top, block_2.top, block_2.bottom) ||
	in_range(block_1.bottom, block_2.top, block_2.bottom)
);

export const detect_block_collision = (block_1, block_2) => (
	in_x_range(block_1, block_2) && in_y_range(block_1, block_2)
);

