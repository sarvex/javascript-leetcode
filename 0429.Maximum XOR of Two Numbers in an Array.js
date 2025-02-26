/**
 * @param {number[]} nums
 * @return {number}
 */
const findMaximumXOR = (nums) => {
    // If array has less than 2 elements, return 0
    if (nums.length < 2) return 0;

    let maxXOR = 0;
    let mask = 0;

    // Process bits from most significant (30) to least significant (0)
    for (let bit = 30; bit >= 0; bit--) {
        // Add current bit to mask
        mask |= (1 << bit);

        // Try to set current bit in maxXOR
        const potentialMax = maxXOR | (1 << bit);

        // Get all prefixes of numbers up to the current bit
        const prefixes = new Set();

        // Check if we can achieve potentialMax with any pair of prefixes
        let canAchievePotentialMax = false;

        for (const num of nums) {
            const prefix = num & mask;

            // If (prefix ^ potentialMax) exists in our set, we can achieve potentialMax
            if (prefixes.has(prefix ^ potentialMax)) {
                canAchievePotentialMax = true;
                break;
            }

            prefixes.add(prefix);
        }

        if (canAchievePotentialMax) {
            maxXOR = potentialMax;
        }
    }

    return maxXOR;
};
