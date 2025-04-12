/**
 * Optimized Set-based solution with minimum tracking
 * @intuition Track minimum value while building set for early termination
 * @approach Use Set for unique values and check minimum against k for validity
 * @complexity
 * Time O(n) where n is the length of nums
 * Space O(n) in worst case for storing unique values
 * @param {number[]} nums - Array of integers
 * @param {number} k - Target value
 * @return {number} Minimum operations or -1 if impossible
 */
const minOperations = (nums, k) => {
  const set = new Set();
  let min = Infinity;

  for (const num of nums) {
    min = Math.min(min, num);
    set.add(num);
  }

  if (min < k) return -1;
  return set.size - (set.has(k) ? 1 : 0);
};
