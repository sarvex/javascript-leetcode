/**
 * Calculate trapped rainwater using an optimized two-pointer approach.
 * @intuition Water is trapped between taller bars. The amount of water above a specific bar is limited by the shorter of the tallest bar to its left and the tallest bar to its right. Instead of pre-calculating these maximums for every bar, we can optimize using two pointers.
 * @approach
 * Initialize `left` pointer at 0, `right` pointer at `n-1`, `leftMax` = `height[0]`, `rightMax` = `height[n-1]`, and `water` = 0.
 * While `left < right`:
 *   If `leftMax < rightMax`:
 *     This means the trapping boundary is determined by `leftMax`.
 *     Increment `left`.
 *     Update `leftMax = Math.max(leftMax, height[left])`.
 *     Add `leftMax - height[left]` to `water`. This is the water trapped above `height[left]`.
 *   Else (`leftMax >= rightMax`):
 *     The trapping boundary is determined by `rightMax`.
 *     Decrement `right`.
 *     Update `rightMax = Math.max(rightMax, height[right])`.
 *     Add `rightMax - height[right]` to `water`. This is the water trapped above `height[right]`.
 * Return `water`.
 * The core idea is that we process the bar pointed to by the pointer with the smaller maximum height seen so far. This is because the water level at that bar is guaranteed to be limited by that smaller maximum.
 * @complexity
 * Time complexity: O(n), as we iterate through the array once with two pointers.
 * Space complexity: O(1), as we only use a constant amount of extra space for pointers and maximums.
 * @param {number[]} height - Array of heights representing elevation map.
 * @return {number} - Total amount of rainwater trapped.
 */
const trap = (height) => {
  if (!height || height.length <= 2) return 0

  let left = 0
  let right = height.length - 1
  let leftMax = height[left]
  let rightMax = height[right]
  let water = 0

  while (left < right) {
    if (leftMax < rightMax) {
      left++
      leftMax = Math.max(leftMax, height[left])
      water += leftMax - height[left]
    } else {
      right--
      rightMax = Math.max(rightMax, height[right])
      water += rightMax - height[right]
    }
  }

  return water
}
