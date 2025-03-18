/**
 * Returns the maximum count between positive integers and negative integers in a sorted array.
 *
 * @param {number[]} nums - The sorted array of integers
 * @return {number} The maximum count between positive integers and negative integers
 *
 * @intuition
 * Since the array is sorted, we can use binary search to efficiently find the positions
 * where negative numbers end and positive numbers begin.
 *
 * @approach
 * 1. Use binary search to find the index of the first non-negative number (≥ 0)
 * 2. Use binary search to find the index of the first positive number (≥ 1)
 * 3. Count of negative numbers = index of first non-negative
 * 4. Count of positive numbers = total length - index of first positive
 * 5. Return the maximum of these two counts
 *
 * @complexity
 * Time: O(log n) where n is the length of the array
 * Space: O(1) constant extra space
 */
const maximumCount = nums => {
  const binarySearch = target => {
    let left = 0
    let right = nums.length

    while (left < right) {
      const mid = (left + right) >>> 1 // Bitwise shift for performance
      if (nums[mid] >= target) {
        right = mid
      } else {
        left = mid + 1
      }
    }

    return left
  }

  const negativeCount = binarySearch(0)
  const positiveCount = nums.length - binarySearch(1)

  return Math.max(negativeCount, positiveCount)
}
