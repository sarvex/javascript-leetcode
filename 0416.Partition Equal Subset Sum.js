/**
 * Bitwise Manipulation Approach
 *
 * @intuition
 * We can represent all possible subset sums using a bitset, where the ith bit is 1 if
 * a sum of i can be formed. This transforms the problem from a 2D DP to a bitwise operation,
 * dramatically improving performance.
 *
 * @approach
 * 1. Calculate the total sum of the array
 * 2. If the sum is odd, return false (can't divide into equal parts)
 * 3. Calculate the target sum (half of total)
 * 4. Use a bitset (represented as a BigInt) where bit i is set if sum i can be achieved
 * 5. For each number, update the bitset by OR-ing it with a shifted version of itself
 * 6. Check if the target bit is set in the final bitset
 *
 * @complexity
 * Time complexity: O(n * max(nums)) - much faster than the DP approach in practice
 * Space complexity: O(1) - we only use a single BigInt regardless of input size
 *
 * @param {number[]} nums - Array of positive integers
 * @return {boolean} - Whether the array can be partitioned into two equal sum subsets
 */
const canPartition = (nums) => {
    const totalSum = nums.reduce((sum, num) => sum + num, 0);
    
    // If sum is odd, it cannot be partitioned into equal subsets
    if (totalSum % 2 !== 0) return false;
    
    const target = totalSum / 2;
    
    // Initialize bitset with only the 0th bit set (we can always form a sum of 0)
    let possibleSums = 1n;
    
    // For each number, update the bitset to include all new sums that can be formed
    for (const num of nums) {
        // The shift operation creates new bits for all previous sums + current number
        // The OR combines these with existing sums
        possibleSums |= (possibleSums << BigInt(num));
    }
    
    // Check if target sum can be formed (if target bit is set)
    return Boolean((possibleSums >> BigInt(target)) & 1n);
};
