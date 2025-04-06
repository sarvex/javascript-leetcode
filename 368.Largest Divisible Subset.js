/**
 * Typed Arrays Optimization with Early Continuation
 * @intuition Sort the array first to ensure we only need to check if nums[j] % nums[i] == 0.
 * Then use DP with typed arrays for better performance and early continuation for faster processing.
 * @approach 
 * 1. Use Uint32Array for sorted nums for better performance with large integers
 * 2. Use Uint16Array for dp and previous indices to reduce memory usage
 * 3. Use early continuation to skip unnecessary calculations
 * 4. Track the index with maximum subset size during DP
 * 5. Reconstruct the subset by following the prev pointers
 * @complexity
 * Time: O(n²) where n is the length of nums
 * Space: O(n) for the dp and prev arrays
 * @param {number[]} nums
 * @return {number[]}
 */
const largestDivisibleSubset = (nums) => {
  // Convert to typed array and sort for performance
  nums = new Uint32Array(nums).sort();
  const n = nums.length;
  
  // Use typed arrays for better performance
  const dp = new Uint16Array(n).fill(1);
  const prev = new Uint16Array(n).fill(10000); // Use sentinel value 10000
  
  let maxIdx = 0;
  
  // Fill dp and prev arrays with early continuation
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      // Early continuation if not divisible
      if (nums[i] % nums[j]) continue;
      // Early continuation if not improving current length
      if (dp[j] + 1 <= dp[i]) continue;
      
      dp[i] = dp[j] + 1;
      prev[i] = j;
    }
    
    // Update the maximum subset index
    if (dp[i] > dp[maxIdx]) maxIdx = i;
  }
  
  // Reconstruct the subset
  const result = [];
  while (maxIdx < 10000) { // Check against sentinel value
    result.push(nums[maxIdx]);
    maxIdx = prev[maxIdx];
  }
  
  return result.reverse();
};
