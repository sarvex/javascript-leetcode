/**
 * 2461. Maximum Sum of Distinct Subarrays With Length K
 *
 * Finds the maximum sum of a subarray of length k with distinct elements using a sliding window approach.
 *
 * Time Complexity: O(n) where n is the length of nums
 * Space Complexity: O(k) for storing distinct elements in the set
 *
 * @param {number[]} nums - Array of integers
 * @param {number} k - Length of the subarray
 * @return {number} - Maximum sum of a subarray of length k with distinct elements
 */
const maximumSubarraySum = (nums, k) => {
  const n = nums.length;
  const uniqueElements = new Set();

  let currentSum = 0;
  let maxSum = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < n; windowEnd++) {
    const currentElement = nums[windowEnd];

    if (uniqueElements.has(currentElement)) {
      while (nums[windowStart] !== currentElement) {
        currentSum -= nums[windowStart];
        uniqueElements.delete(nums[windowStart]);
        windowStart++;
      }
      windowStart++;
    } else {
      currentSum += currentElement;
      uniqueElements.add(currentElement);

      if (windowEnd - windowStart + 1 === k) {
        maxSum = Math.max(maxSum, currentSum);

        currentSum -= nums[windowStart];
        uniqueElements.delete(nums[windowStart]);
        windowStart++;
      }
    }
  }

  return maxSum;
};
