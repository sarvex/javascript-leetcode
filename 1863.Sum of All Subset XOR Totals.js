/**
 * Mathematical Optimization - Using bit properties of XOR across subsets
 *
 * @intuition
 * For each bit position, we can determine how many times it appears in all subset XORs.
 * Each element appears in exactly 2^(n-1) subsets, and if any bit is set in any element,
 * it contributes to the final sum in a predictable way.
 *
 * @approach
 * 1. Calculate the bitwise OR of all elements in the array
 * 2. Each bit set in this OR will contribute to 2^(n-1) subsets
 * 3. Multiply the OR result by 2^(n-1) to get the final sum
 * 4. This works because each element appears in exactly half of all possible subsets
 *
 * @complexity
 * Time: O(n), where n is length of input array
 * Space: O(1), only using constant extra space
 *
 * @param {number[]} nums Array of non-negative integers
 * @return {number} Sum of XOR totals for all possible subsets
 */
const subsetXORSum = nums => {
    let bitmask = 0;
    
    // Calculate the bitwise OR of all elements
    for (const num of nums) {
        bitmask |= num;
    }
    
    // Multiply by 2^(n-1)
    return bitmask << (nums.length - 1);
};
