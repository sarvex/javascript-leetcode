/**
 * @param {number} n
 * @return {number[]}
 */
const constructDistancedSequence = function(n) {
    // Length of the sequence will be 2n-1
    // (each number 2 to n appears twice, 1 appears once)
    const length = 2 * n - 1;
    const result = new Array(length).fill(0);
    const used = new Array(n + 1).fill(false);

    // Helper function to place number 1
    function placeOne(pos) {
        result[pos] = 1;
        used[1] = true;

        const success = backtrack(pos + 1);

        if (!success) {
            result[pos] = 0;
            used[1] = false;
        }

        return success;
    }

    // Helper function to place numbers 2 to n
    function placeNumber(num, pos) {
        if (pos + num >= length || result[pos + num] !== 0) {
            return false;
        }

        result[pos] = num;
        result[pos + num] = num;
        used[num] = true;

        const success = backtrack(pos + 1);

        if (!success) {
            result[pos] = 0;
            result[pos + num] = 0;
            used[num] = false;
        }

        return success;
    }

    function backtrack(pos) {
        // If we've filled all positions, we've found a valid sequence
        if (pos === length) return true;

        // If position is already filled, move to next position
        if (result[pos] !== 0) return backtrack(pos + 1);

        // Try placing numbers from largest to smallest for lexicographically largest sequence
        for (let num = n; num >= 1; num--) {
            if (used[num]) continue;

            // Place the number and check if it leads to a valid solution
            const success = num === 1 ? placeOne(pos) : placeNumber(num, pos);
            if (success) return true;
        }

        return false;
    }

    backtrack(0);
    return result;
};
