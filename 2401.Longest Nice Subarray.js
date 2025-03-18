/**
 * Finds the length of the longest subarray where every pair of elements has no bits in common.
 * @param {number[]} nums - An array of non-negative integers
 * @return {number} - The length of the longest nice subarray
 * 
 * @intuition
 * A nice subarray has bitwise AND of 0 between any two elements, meaning no overlapping bits.
 * Use sliding window with a bitmask to track used bits in the current window.
 * 
 * @approach
 * 1. Use sliding window with left and right pointers
 * 2. Track set bits with a bitmask
 * 3. Shrink window when new number has overlapping bits
 * 4. Track maximum window size
 * 
 * @complexity
 * Time: O(n) where n is the length of nums
 * Space: O(1)
 */
const longestNiceSubarray = nums => {
  let max = 0;
  let mask = 0;
  
  for (let l = 0, r = 0; r < nums.length; ++r) {
    while (mask & nums[r]) mask ^= nums[l++];
    
    mask |= nums[r];
    max = Math.max(max, r - l + 1);
  }
  
  return max;
};
