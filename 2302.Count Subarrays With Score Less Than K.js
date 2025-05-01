/**
 * Sliding window to count valid subarrays with score < k
 * @intuition Use two pointers to maintain a window where sum * length < k, expanding right and shrinking left as needed
 * @approach Iterate with a right pointer, add nums[right] to window sum, and shrink left pointer until (window sum) * (window length) < k. For each right, number of valid subarrays ending at right is (right - left + 1)
 * @complexity Time: O(n), Space: O(1)
 * @param {number[]} nums - positive integers
 * @param {number} k - upper bound for score
 * @returns {number} count of subarrays with score < k
 */
const countSubarrays = (nums, k) => {
  let n = nums.length
  let left = 0, right = 0
  let windowSum = n ? nums[0] : 0
  let totalSubarrays = 0
  while (right < n) {
    const windowLength = right - left + 1
    const windowScore = windowSum * windowLength
    if (windowScore < k) {
      totalSubarrays += windowLength
      right++
      if (right < n) windowSum += nums[right]
    } else {
      windowSum -= nums[left]
      left++
    }
  }
  return totalSubarrays
}
