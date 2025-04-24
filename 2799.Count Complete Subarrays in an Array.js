/**
 * Sliding window with frequency map to count complete subarrays
 *
 * @intuition
 * Track the number of unique elements in the array. For each right pointer, expand the window and shrink from the left when all unique elements are present, counting all valid subarrays.
 *
 * @approach
 * Use a Map to track the frequency of elements in the current window. When the window contains all unique elements, every subarray ending at the current right pointer is valid. Shrink the window from the left to find all such subarrays efficiently.
 *
 * @complexity
 * time O(n)
 * space O(n)
 *
 * @param {number[]} nums - The array of numbers to process
 * @returns {number} The count of complete subarrays
 */
export const countCompleteSubarrays = (nums = []) => {
  if (!nums.length) {
    return 0
  }
  const uniqueCount = new Set(nums).size
  const frequency = new Map()
  let total = 0
  let left = 0
  for (let right = 0; right < nums.length; right++) {
    const value = nums[right]
    frequency.set(value, (frequency.get(value) ?? 0) + 1)
    while (frequency.size === uniqueCount) {
      total += nums.length - right
      const leftValue = nums[left]
      frequency.set(leftValue, frequency.get(leftValue) - 1)
      if (frequency.get(leftValue) === 0) {
        frequency.delete(leftValue)
      }
      left++
    }
  }
  return total
}
