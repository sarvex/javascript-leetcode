class HitCounter {
	constructor() {}

	hit(timestamp) {
		this.ts.push(timestamp);
	}

	getHits(timestamp) {
		const search = (x) => {
			let [l, r] = [0, this.ts.length];
			while (l < r) {
				const mid = (l + r) >> 1;
				if (this.ts[mid] >= x) {
					r = mid;
				} else {
					l = mid + 1;
				}
			}
			return l;
		};
		return this.ts.length - search(timestamp - 300 + 1);
	}
}

/**
 * Your HitCounter object will be instantiated and called as such:
 * var obj = new HitCounter()
 * obj.hit(timestamp)
 * var param_2 = obj.getHits(timestamp)
 */
