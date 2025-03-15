/**
 * Find maximum average of any contiguous k-element subarray.
 *
 * @intuition
 * Sliding window for efficient sum calculation.
 *
 * @approach
 * Track sum of current window while sliding through array.
 *
 * @complexity
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findMaxAverage = (nums, k) => {
  let currentSum = 0

  for (let i = 0; i < k; i++) {
    currentSum += nums[i]
  }

  let maxSum = currentSum

  for (let i = k; i < nums.length; i++) {
    currentSum += nums[i] - nums[i - k]
    maxSum = Math.max(maxSum, currentSum)
  }

  return maxSum / k
}
