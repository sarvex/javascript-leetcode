/**
 * 2874. Maximum Value of an Ordered Triplet II
 *
 * Given a 0-indexed integer array nums, find the maximum value over all triplets of indices (i, j, k)
 * such that i < j < k. The value of a triplet (i, j, k) is equal to (nums[i] - nums[j]) * nums[k].
 * Return the maximum value over all possible triplets, or 0 if no valid triplet exists.
 * 
 * @param {number[]} nums - The input array of integers
 * @return {number} - The maximum value of (nums[i] - nums[j]) * nums[k] where i < j < k
 * 
 * Time Complexity: O(n) where n is the length of the input array
 * Space Complexity: O(1) as we only use a constant amount of extra space
 */
const maximumTripletValue = (nums) => {
  // Track the maximum result found so far
  let maxResult = 0;
  
  // Track the maximum difference (nums[i] - nums[j]) found so far
  let maxDifference = 0;
  
  // Track the maximum value (potential nums[i]) found so far
  let maxValue = 0;
  
  // Iterate through each number in the array
  for (const currentNum of nums) {
    // Calculate potential result using current number as nums[k]
    // and the maximum difference found so far
    maxResult = Math.max(maxResult, maxDifference * currentNum);
    
    // Calculate potential difference using current number as nums[j]
    // and the maximum value found so far as nums[i]
    maxDifference = Math.max(maxDifference, maxValue - currentNum);
    
    // Update the maximum value found so far (potential future nums[i])
    maxValue = Math.max(maxValue, currentNum);
  }
  
  return maxResult;
};
