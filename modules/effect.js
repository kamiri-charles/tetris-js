export default class Effect {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.radius = 15;
		this.size = 32;
		this.image = new Image();
		this.image.src = "../assets/Effect.png";
		this.marked_for_deletion = false;
		this.frame = 0;
		this.counter = 0;
	}

	render(context) {
		this.counter += 1;
		if (this.counter % 4 == 0) {
			this.frame += this.size;
		}

		if (this.frame > 6 * this.size) {
			this.marked_for_deletion = true;
		}

		context.drawImage(
			this.image,
			this.frame,
			0,
			this.size,
			this.size,
			this.x - 16,
			this.y - 16,
			this.size,
			this.size
		);
	}
}
