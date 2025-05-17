/**
 * Dutch National Flag - One-pass algorithm with O(n) time complexity
 * @intuition
 * Since we only have 3 colors (0, 1, 2), we can use the Dutch National Flag algorithm.
 * We maintain three pointers to track regions: left (0s), current (1s), and right (2s).
 * @approach
 * 1. Initialize three pointers: left = 0, current = 0, right = nums.length - 1
 * 2. Iterate while current <= right
 * 3. If current element is 0, swap with left pointer and increment both
 * 4. If current element is 1, just increment current
 * 5. If current element is 2, swap with right pointer and decrement right
 * @complexity
 * Time complexity: O(n) - single pass through the array
 * Space complexity: O(1) - constant extra space
 * @param {number[]} nums - Array containing only 0s, 1s, and 2s
 */
const sortColors = nums => {
  let left = 0
  let current = 0
  let right = nums.length - 1

  while (current <= right) {
    if (nums[current] === 0) {
      [nums[left], nums[current]] = [nums[current], nums[left]]
      left++
      current++
    } else if (nums[current] === 1) {
      current++
    } else {
      [nums[right], nums[current]] = [nums[current], nums[right]]
      right--
    }
  }
}
