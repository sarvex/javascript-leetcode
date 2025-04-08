/**
 * Set-based approach to find minimum operations
 * 
 * @intuition We need to check for the first duplicate element from the end of the array.
 * Once found, we can calculate the minimum operations needed based on the position.
 * 
 * @approach
 * 1. Traverse the array from right to left
 * 2. Use a Set to track seen elements
 * 3. When a duplicate is found, calculate operations based on position
 * 4. Return 0 if no duplicates are found
 * 
 * @complexity
 * Time: O(n) where n is the length of the array
 * Space: O(n) for storing elements in the Set
 * 
 * @param {number[]} nums - The input array of numbers
 * @return {number} The minimum number of operations required
 */
const minimumOperations = nums => {
  const seen = new Set();
  
  for (let i = nums.length - 1; i >= 0; i--) {
    if (seen.has(nums[i])) {
      return Math.ceil((i + 1) / 3);
    }
    seen.add(nums[i]);
  }
  
  return 0;
};
