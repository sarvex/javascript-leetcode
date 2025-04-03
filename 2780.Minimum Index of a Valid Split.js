/**
 * Boyer-Moore Voting Algorithm Approach
 *
 * @intuition
 * A valid split requires the dominant element to remain dominant in both subarrays.
 * We can use the Boyer-Moore voting algorithm to efficiently find the dominant element
 * in linear time without using extra space for a frequency map.
 *
 * @approach
 * 1. Use Boyer-Moore voting algorithm to find the dominant element
 * 2. Count the total occurrences of the dominant element
 * 3. Iterate through possible split points, tracking the count of the dominant element
 * 4. Check if the dominant element is dominant in both resulting subarrays
 *
 * @complexity
 * Time complexity: O(n) where n is the length of nums
 * Space complexity: O(1) - constant extra space
 *
 * @param {number[]} nums - The input array of integers
 * @return {number} - The minimum index of a valid split or -1 if no valid split exists
 */
const minimumIndex = nums => {
  // Find the dominant element using Boyer-Moore voting algorithm
  let count = 0
  let dominant = 0

  for (const num of nums) {
    if (count === 0) {
      dominant = num
    }
    count += num === dominant ? 1 : -1
  }

  // Count total occurrences of the dominant element
  const totalCount = nums.reduce((acc, num) => acc + (num === dominant ? 1 : 0), 0)

  // Check each potential split point
  let leftCount = 0
  const n = nums.length

  for (let i = 0; i < n; i++) {
    if (nums[i] === dominant) {
      leftCount++
    }

    const leftSize = i + 1
    const rightSize = n - leftSize
    const rightCount = totalCount - leftCount

    // Check if dominant element remains dominant in both subarrays
    if (leftCount * 2 > leftSize && rightCount * 2 > rightSize) {
      return i
    }
  }

  return -1
}
