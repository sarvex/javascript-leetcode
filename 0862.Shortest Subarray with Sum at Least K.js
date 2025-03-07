/**
 * @param {number[]} nums - The input array of integers
 * @param {number} k - The minimum sum required for a valid subarray
 * @return {number} - Length of the shortest subarray with sum at least k, or -1 if none exists
 *
 * Finds the shortest subarray with sum at least k using a monotonic queue approach.
 *
 * Time Complexity: O(n) where n is the length of the input array
 * Space Complexity: O(n) for the prefix sum array and the deque
 */
const shortestSubarray = (nums, k) => {
  const n = nums.length
  const prefixSums = Array(n + 1).fill(0)

  for (let i = 0; i < n; i++) {
    prefixSums[i + 1] = nums[i] + prefixSums[i]
  }

  let minLength = n + 1
  let left = 0
  const deque = []

  for (let i = 0; i < n + 1; i++) {
    // Early optimization for single elements
    if (nums[i] >= k) {
      return 1
    }

    while (left < deque.length && prefixSums[i] - prefixSums[deque[left]] >= k) {
      minLength = Math.min(minLength, i - deque[left])
      left++
    }

    while (left < deque.length && prefixSums[i] <= prefixSums[deque[deque.length - 1]]) {
      deque.pop()
    }

    deque.push(i)
  }

  return minLength <= n ? minLength : -1
}
