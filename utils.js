export const globals = {
	CANVAS_WIDTH: window.innerWidth,
	CANVAS_HEIGHT: window.innerHeight,
	BOARD_WIDTH: 300,
	BOARD_HEIGHT: window.innerHeight - 100,
	BLOCK_SIZE: 20,
	FALL_SPEED: 1
};


// Utility functions
export const detect_block_collision = (block_1, block_2) => (
	(block_1.bottom >= block_2.top && block_1.top <= block_2.bottom) &&
	(block_1.right > block_2.left && block_1.right <= block_2.right)
);

export const x_dist = (block_1, block_2) => {
	let dist = 0;

	// calculate x distance
	if (block_1.right < block_2.left) {
		dist = block_2.left - block_1.right;
	};

	if (block_1.left > block_2.right) {
		dist = block_1.left - block_2.right;
	};

	return dist;
};

export const y_dist = (block_1, block_2) => {
	let dist = 0;

	// calculate x distance
	if (block_1.bottom < block_2.top) {
		dist = block_2.top - block_1.bottom;
	}

	if (block_1.top > block_2.bottom) {
		dist = block_1.top - block_2.bottom;
	}

	return dist;
};

