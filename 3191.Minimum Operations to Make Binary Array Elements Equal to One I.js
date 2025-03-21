/**
 * Calculates the minimum operations needed to make all array elements equal to 1.
 * 
 * @intuition
 * We can only flip adjacent elements, so when encountering a 0, we must flip it
 * along with its two neighbors to the right. This is a greedy approach where we
 * handle zeros as we encounter them from left to right.
 * 
 * @approach
 * 1. Iterate through the array from left to right
 * 2. When encountering a 0, flip it and the next two elements using XOR
 * 3. If we can't flip (not enough elements to the right), return -1
 * 4. Count the number of operations performed
 * 
 * @complexity
 * Time: O(n) where n is the length of the array
 * Space: O(1) as we modify the input array in-place
 * 
 * @param {number[]} nums - Binary array containing only 0s and 1s
 * @return {number} - Minimum operations needed or -1 if impossible
 */
const minOperations = nums => {
  const n = nums.length;
  let operations = 0;
  
  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) {
      // If we can't flip the next two elements, it's impossible
      if (i + 2 >= n) {
        return -1;
      }
      
      // Flip current and next two elements using XOR
      nums[i + 1] ^= 1;
      nums[i + 2] ^= 1;
      operations++;
    }
  }
  
  return operations;
};
