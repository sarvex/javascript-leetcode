/**
 * @param {number[]} nums
 * @return {number}
 */
const continuousSubarrays = (nums) => {
  let [left, result] = [0, 0]
  let minDeque = []
  let maxDeque = []

  for (let right = 0; right < nums.length; right++) {
    // Maintain maxDeque (Monotonic decreasing)
    while (maxDeque.length && nums[maxDeque[maxDeque.length - 1]] <= nums[right]) {
      maxDeque.pop()
    }
    maxDeque.push(right)

    // Maintain minDeque (Monotonic increasing)
    while (minDeque.length && nums[minDeque[minDeque.length - 1]] >= nums[right]) {
      minDeque.pop()
    }
    minDeque.push(right)

    // If the current window is invalid, move left pointer
    while (nums[maxDeque[0]] - nums[minDeque[0]] > 2) {
      if (maxDeque[0] === left) maxDeque.shift()
      if (minDeque[0] === left) minDeque.shift()
      left++
    }

    // Count valid subarrays
    result += right - left + 1
  }

  return result
}
