/**
 * Finds the maximum number of candies that can be allocated to k children.
 * 
 * @intuition
 * Binary search to find the maximum possible allocation size. We optimize by
 * using direct loops instead of reduce for performance, and bitwise operations
 * where possible.
 * 
 * @approach
 * 1. Handle corner case: if total candies < k, return 0
 * 2. Define search space: 1 to max(candies)
 * 3. Binary search for the maximum valid allocation
 * 4. Use optimized loops instead of reduce for better performance
 * 
 * @complexity
 * Time: O(n + n * log(max(candies))), where n is the length of candies array
 * Space: O(1), constant extra space used
 * 
 * @param {number[]} candies - Array of candy piles
 * @param {number} k - Number of children
 * @return {number} - Maximum possible candies per child
 */
const maximumCandies = (candies, k) => {
  // Calculate sum and find max in a single pass
  let sum = 0;
  let max = 0;
  for (const candy of candies) {
    sum += candy;
    max = candy > max ? candy : max;
  }
  
  // Corner case: if total candies < k, return 0
  if (sum < k) return 0;
  
  // Binary search
  let left = 1;
  let right = max;
  let ans = 0;
  
  while (left <= right) {
    const mid = (left + right) >>> 1; // Faster unsigned right shift
    
    // Count possible distributions
    let count = 0;
    for (const candy of candies) {
      count += (candy / mid) | 0; // Bitwise OR with 0 for faster Math.floor
      if (count >= k) break; // Early termination
    }
    
    if (count >= k) {
      ans = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return ans;
};
