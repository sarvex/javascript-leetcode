/**
 * @param {number[]} nums
 * @return {number}
 */
const maximumXOR = (nums) => {
    // The operation nums[i] & (nums[i] ^ x) can only turn 1-bits to 0-bits
    // For maximum XOR, we need at least one 1-bit in each position
    // Simply OR all numbers together
    let result = 0;

    // Using for-of loop for better performance
    for (const num of nums) {
        result |= num;
    }

    return result;
};
