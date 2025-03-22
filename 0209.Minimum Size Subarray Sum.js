/**
 * Sliding Window - Find minimum length subarray with sum ≥ target
 * 
 * @intuition
 * We can use a sliding window approach to find the minimum length subarray.
 * By expanding the window to the right and shrinking from the left when the sum
 * is sufficient, we can efficiently find the minimum length.
 * 
 * @approach
 * 1. Initialize a sliding window with left and right pointers at index 0
 * 2. Expand the window by moving the right pointer and adding elements
 * 3. When the sum becomes ≥ target, try to minimize the window by moving the left pointer
 * 4. Track the minimum window size that satisfies the condition
 * 
 * @complexity
 * Time complexity: O(n) where n is the length of the array
 * Space complexity: O(1) as we only use constant extra space
 * 
 * @param {number} target - The target sum to reach
 * @param {number[]} nums - The input array of positive integers
 * @return {number} The minimum length of a subarray with sum ≥ target, or 0 if impossible
 */
const minSubArrayLen = (target, nums) => {
  const n = nums.length;
  let sum = 0;
  let minLength = n + 1;
  
  for (let left = 0, right = 0; right < n; ++right) {
    sum += nums[right];
    
    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left++];
    }
  }
  
  return minLength > n ? 0 : minLength;
};
