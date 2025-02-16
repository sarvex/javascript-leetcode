/**
 * @param {number} n
 * @return {number[]}
 */
var constructDistancedSequence = function(n) {
    // Length of the sequence will be 2n-1
    // (each number 2 to n appears twice, 1 appears once)
    const length = 2 * n - 1;
    const result = new Array(length).fill(0);
    const used = new Array(n + 1).fill(false);

    function backtrack(pos) {
        // If we've filled all positions, we've found a valid sequence
        if (pos === length) return true;

        // If position is already filled, move to next position
        if (result[pos] !== 0) return backtrack(pos + 1);

        // Try placing numbers from largest to smallest for lexicographically largest sequence
        for (let num = n; num >= 1; num--) {
            if (used[num]) continue;

            if (num === 1) {
                // For number 1, we just need one position
                result[pos] = 1;
                used[1] = true;

                if (backtrack(pos + 1)) return true;

                result[pos] = 0;
                used[1] = false;
            } else {
                // For numbers 2 to n, we need two positions with distance num
                if (pos + num >= length || result[pos + num] !== 0) continue;

                result[pos] = num;
                result[pos + num] = num;
                used[num] = true;

                if (backtrack(pos + 1)) return true;

                result[pos] = 0;
                result[pos + num] = 0;
                used[num] = false;
            }
        }

        return false;
    }

    backtrack(0);
    return result;
};
