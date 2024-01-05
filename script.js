import Board from "./modules/board.js";
import { Tetromino } from "./modules/tetromino.js";
import { globals, shapes } from "./utils.js";

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    canvas.width = globals.CANVAS_WIDTH;
    canvas.height = globals.CANVAS_HEIGHT;
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');

    const board = new Board();
    
    let random_shape = shapes[Math.floor(Math.random() * shapes.length)];
    let current_tetro = new Tetromino(random_shape);

    const surface_tetros = [];

    document.onkeydown = evt => {
        if (evt.key == 'ArrowUp') current_tetro.rotate();
        //if (evt.key == 'ArrowDown') current_tetro.y++;
        if (evt.key == 'ArrowLeft') current_tetro.move_left();
        if (evt.key == 'ArrowRight') current_tetro.move_right();
    }
    
    
    
    const animate = () => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        board.render(ctx);
        
        if (current_tetro.reached_bottom) {
            surface_tetros.push(current_tetro);
            current_tetro = new Tetromino(
              shapes[Math.floor(Math.random() * shapes.length)]
            );
        }

        surface_tetros.forEach(tetro => tetro.render(ctx));
        current_tetro.render(ctx, surface_tetros);



        requestAnimationFrame(animate);
    }

    animate();
});