/**
 * @param {number} n
 * @param {number} x
 * @param {number} y
 * @return {number[]}
 */
const countOfPairs = (n, x, y) => {
    // Ensure x <= y for simplicity
    if (x > y) {
        [x, y] = [y, x];
    }

    // Initialize result array (1-indexed, so use n+1 size)
    const result = new Array(n+1).fill(0);

    // Pre-compute the new graph distance considering the shortcut
    const getDistance = (i, j) => {
        // Direct distance along the line
        const directDist = Math.abs(i - j);

        // Distance using the shortcut between x and y
        const shortcutDist = Math.min(
            Math.abs(i - x) + Math.abs(j - y) + 1,
            Math.abs(i - y) + Math.abs(j - x) + 1
        );

        return Math.min(directDist, shortcutDist);
    };

    // For each pair of houses, calculate minimum distance
    for (let i = 1; i <= n; i++) {
        for (let j = i + 1; j <= n; j++) {
            const dist = getDistance(i, j);
            // Count both directions (i→j and j→i)
            result[dist] += 2;
        }
    }

    // Remove zero index to make result 1-indexed
    return result.slice(1);
};
