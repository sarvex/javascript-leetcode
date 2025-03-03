/**
 * @param {number} n
 * @return {boolean}
 */
const isPowerOfThree = (n) => {
	return n > 0 && 1162261467 % n == 0;
};
