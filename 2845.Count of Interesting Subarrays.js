/**
 * Optimized index tracking & DP for interesting subarrays (jumping pointers, modular DP)
 *
 * @intuition
 * Track indices where nums[i] % modulo == k, use DP or pointer jumps to count valid subarrays efficiently.
 *
 * @approach
 * Maintain an array of indices where nums[i] % modulo == k. Use a DP array (if modulo < n) to count subarrays ending at each index, else use pointer math. For each qualifying index, incrementally calculate the count based on previously seen indices and DP states, handling k == 0 as a special case.
 *
 * @complexity
 * time O(n)
 * space O(min(n, modulo))
 *
 * @param {number[]} nums - Input array
 * @param {number} modulo - Modulo divisor
 * @param {number} k - Target remainder
 * @returns {number} Count of interesting subarrays
 */
const countInterestingSubarrays = (nums = [], modulo, k) => {
  const arr = [-1]
  let res = 0
  let dp
  const useDp = modulo < nums.length
  if (useDp) dp = Array(modulo).fill(0)
  for (let i = 0; i <= nums.length; i++) {
    if (i === nums.length || nums[i] % modulo === k) {
      const len = k === 0 ? modulo : k
      if (len < arr.length && useDp) {
        res += dp[(arr.length - len - 1) % modulo] * (i - arr.at(-1))
      } else if (len < arr.length) {
        res += (i - arr.at(-1)) * (arr.at(-len) - arr.at(-len - 1))
      }
      if (useDp) dp[(arr.length - 1) % modulo] += i - arr.at(-1)
      arr.push(i)
    } else if (k === 0) {
      res += i - arr.at(-1)
    }
  }
  return res
}
