/**
 * Finds the maximum number of non-overlapping subarrays with a sum equal to target
 *
 * @intuition Use a prefix sum approach with a set to track previously seen sums
 * When we find a subarray with sum equal to target, we can count it and start a new search
 *
 * @approach
 * 1. Iterate through the array using a greedy approach
 * 2. For each starting position, calculate prefix sums and track them in a set
 * 3. When we find a subarray with sum = target, increment the count and move to the next position
 * 4. The outer loop ensures we consider all possible starting positions
 *
 * @complexity
 * Time complexity: O(n) where n is the length of the input array
 * Space complexity: O(n) for storing prefix sums in the set
 *
 * @param {number[]} nums - The input array of integers
 * @param {number} target - The target sum to find in subarrays
 * @return {number} - Maximum number of non-overlapping subarrays with sum equal to target
 */
const maxNonOverlapping = (nums, target) => {
  const n = nums.length;
  let count = 0;
  
  for (let i = 0; i < n; ++i) {
    let prefixSum = 0;
    const seenSums = new Set([0]);
    
    for (; i < n; ++i) {
      prefixSum += nums[i];
      
      if (seenSums.has(prefixSum - target)) {
        ++count;
        break;
      }
      
      seenSums.add(prefixSum);
    }
  }
  
  return count;
}
