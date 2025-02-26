/**
 * @param {number} n - Maximum number of flowers in clockwise direction
 * @param {number} m - Maximum number of flowers in anti-clockwise direction
 * @return {number} - Number of pairs (x,y) where Alice wins
 */
const flowerGame = (n, m) => {
    // Alice wins when (x + y) is odd, which happens when one value is even and one is odd
    return (Math.ceil(n / 2) * Math.floor(m / 2)) + (Math.floor(n / 2) * Math.ceil(m / 2));
};
