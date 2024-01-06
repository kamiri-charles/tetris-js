export default class Controller {
	constructor() {
		this.up = false;
		this.down = false;
		this.left = false;
		this.right = false;

		this.init();
	};
	
	#keydown_bind(evt) {
		switch (evt.key) {
			case "ArrowUp":
				this.up = true;
				break;
			case "ArrowDown":
				this.down = true;
				break;
			case "ArrowLeft":
				this.left = true;
				break;
			case "ArrowRight":
				this.right = true;
				break;
		};
	}

	#keyup_bind(evt) {
		switch (evt.key) {
			case "ArrowUp":
				this.up = false;
				break;
			case "ArrowDown":
				this.down = false;
				break;
			case "ArrowLeft":
				this.left = false;
				break;
			case "ArrowRight":
				this.right = false;
				break;
		};
	}

	init() {
		document.addEventListener('keydown', this.#keydown_bind);
		document.addEventListener('keyup', this.#keyup_bind);
	}
	
	destroy() {
		document.removeEventListener('keydown', this.#keydown_bind);
		document.removeEventListener('keyup', this.#keyup_bind);
	}
}