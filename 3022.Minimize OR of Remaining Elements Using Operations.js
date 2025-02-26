/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minOrAfterOperations = (nums, k) => {
    const n = nums.length;
    let ans = 0;

    // Process bits from most significant to least
    for (let bit = 30; bit >= 0; bit--) {
        // Current mask with all bits we've decided to keep as 1
        let mask = ans | ((1 << (bit + 1)) - 1);

        let consecutive = 0;
        let operations = 0;

        // Count operations needed
        for (let i = 0; i < n; i++) {
            // Apply the mask to current number
            consecutive &= (nums[i] | ~mask);

            if (consecutive === 0) {
                // We need an operation here
                operations++;
                consecutive = ~0; // Reset to all 1s
            }
        }

        // If we can perform k operations, we can set this bit to 0
        // Otherwise, we must keep this bit as 1
        if (n - operations <= k) {
            // We can eliminate this bit
            ans &= ~(1 << bit);
        } else {
            // We must keep this bit
            ans |= (1 << bit);
        }
    }

    return ans;
};
