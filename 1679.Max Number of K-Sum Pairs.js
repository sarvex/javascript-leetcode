/**
 * Finds the maximum number of operations where two numbers sum to k
 * 
 * @param {number[]} nums - Array of integers
 * @param {number} k - Target sum
 * @return {number} - Maximum number of operations
 * 
 * @intuition
 * For each number, we need to find its complement (k-num) to form a pair.
 * Using a frequency map allows us to track available numbers in a single pass.
 * 
 * @approach
 * 1. Create a frequency map to track occurrences of each number
 * 2. For each number in nums:
 *    - Calculate the target complement (k - num)
 *    - If target exists in our map with count > 0, form a pair and decrement target's count
 *    - Otherwise, increment the count of the current number in the map
 * 3. Return the total count of pairs formed
 * 
 * @complexity
 * Time: O(n) where n is the length of nums
 * Space: O(n) for the frequency map in worst case
 */
const maxOperations = (nums, k) => {
  const map = new Map();
  let count = 0;
  
  for (const num of nums) {
    const target = k - num;
    
    if (map.has(target) && map.get(target) > 0) {
      count++;
      map.set(target, map.get(target) - 1);
    } else {
      map.set(num, (map.get(num) || 0) + 1);
    }
  }
  
  return count;
};
