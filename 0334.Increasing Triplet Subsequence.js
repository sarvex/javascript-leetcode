/**
 * Determines if there exists a triplet of indices (i, j, k) such that i < j < k and nums[i] < nums[j] < nums[k]
 * 
 * @intuition
 * We can solve this by keeping track of the two smallest values we've seen so far.
 * If we find a value larger than both, we've found our triplet.
 * 
 * @approach
 * 1. Initialize first and second as Infinity
 * 2. Iterate through the array:
 *    - If current number is less than or equal to first, update first
 *    - If current number is greater than first but less than or equal to second, update second
 *    - If current number is greater than both first and second, we've found our triplet
 * 3. Return false if we complete the iteration without finding a triplet
 * 
 * @complexity
 * Time: O(n) where n is the length of the input array
 * Space: O(1) as we only use two variables regardless of input size
 * 
 * @param {number[]} nums - Array of integers
 * @return {boolean} - True if an increasing triplet subsequence exists, false otherwise
 */
const increasingTriplet = (nums) => {
  let first = Infinity;
  let second = Infinity;

  for (const num of nums) {
    if (num <= first) {
      first = num;
    } else if (num <= second) {
      second = num;
    } else {
      return true;
    }
  }

  return false;
};
