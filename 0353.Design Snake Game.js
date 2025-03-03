class SnakeGame {
	constructor(width, height, food) {
		this.m = height;
		this.n = width;
		this.food = food;
		this.score = 0;
		this.idx = 0;
		this.q = [0];
		this.vis = new Set([0]);
	}

	move(direction) {
		const p = this.q[0];
		const i = Math.floor(p / this.n);
		const j = p % this.n;
		let x = i;
		let y = j;
		if (direction === "U") {
			--x;
		} else if (direction === "D") {
			++x;
		} else if (direction === "L") {
			--y;
		} else {
			++y;
		}
		if (x < 0 || x >= this.m || y < 0 || y >= this.n) {
			return -1;
		}
		if (
			this.idx < this.food.length &&
			x === this.food[this.idx][0] &&
			y === this.food[this.idx][1]
		) {
			++this.score;
			++this.idx;
		} else {
			const t = this.q.pop();
			this.vis.delete(t);
		}
		const cur = x * this.n + y;
		if (this.vis.has(cur)) {
			return -1;
		}
		this.q.unshift(cur);
		this.vis.add(cur);
		return this.score;
	}
}

/**
 * Your SnakeGame object will be instantiated and called as such:
 * var obj = new SnakeGame(width, height, food)
 * var param_1 = obj.move(direction)
 */
