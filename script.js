import Board from "./modules/board.js";
import { Tetromino } from "./modules/tetromino.js";
import { globals } from "./utils.js";
import { shapes } from "./shape_data.js";
import Effect from "./modules/effect.js";

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    canvas.width = globals.CANVAS_WIDTH;
    canvas.height = globals.CANVAS_HEIGHT;
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');

    const board = new Board();
    
    let random_shape = shapes[Math.floor(Math.random() * shapes.length)];
    //let current_tetro = new Tetromino(board, random_shape);
    let current_tetro = new Tetromino(board, shapes[1]);;

    let fallen_blocks = [];
    let effects = [];

    // Score logic
    let score = 0;
    const row_max_blocks = globals.BOARD_WIDTH / globals.BLOCK_SIZE;

    const check_rows = () => {
        for (let i = board.bottom; i >= 0; i -= globals.BLOCK_SIZE) {
            let row_blocks = fallen_blocks.filter(block => (block.y + block.height) == i);
            if (row_blocks.length >= row_max_blocks) {
                row_blocks.forEach(block => {
                    effects.push(new Effect(
                        (block.left + block.right) / 2,
                        (block.top + block.bottom) / 2
                    ));
                    block.marked_for_deletion = true;
                });

                fallen_blocks = fallen_blocks.filter(block => !block.marked_for_deletion);
                fallen_blocks.forEach(block => {
                    block.y += globals.BLOCK_SIZE;
                    block.update();
                });
                i += globals.BLOCK_SIZE;
            }
        }
    }

    // Controls
    document.onkeydown = evt => {
        if (evt.key == 'ArrowUp') current_tetro.rotate();
        if (evt.key == 'ArrowDown') current_tetro.y += current_tetro.speed * 0.5;
        if (evt.key == 'ArrowRight') current_tetro.move_right(fallen_blocks);
        if (evt.key == 'ArrowLeft') current_tetro.move_left(fallen_blocks);
        if (evt.key == 'q') console.log(fallen_blocks, board.bottom);
    }
    
    const animate = () => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        board.render(ctx);
        
        
        if (current_tetro.reached_bottom) {
            current_tetro.blocks.forEach(block => fallen_blocks.push(block));
            check_rows();
            //current_tetro = new Tetromino(board, shapes[Math.floor(Math.random() * shapes.length)]);
            current_tetro = new Tetromino(board, shapes[1]);
        }

        fallen_blocks.forEach(block => block.render(ctx));
        effects.forEach(effect => effect.render(ctx));
        effects = effects.filter(effect => !effect.marked_for_deletion);
        current_tetro.render(ctx, fallen_blocks);

        requestAnimationFrame(animate);
    }

    animate();
});