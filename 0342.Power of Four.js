/**
 * @param {number} n
 * @return {boolean}
 */
const isPowerOfFour = (n) => {
	return n > 0 && (n & (n - 1)) == 0 && (n & 0xaaaaaaaa) == 0;
};
