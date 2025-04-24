/**
 * Sliding Window with Pair Counting
 *
 * @intuition Use a sliding window to efficiently count the number of subarrays with at least k equal pairs by expanding the right pointer and shrinking the left pointer as needed.
 *
 * @approach Maintain a frequency map and a running count of pairs in the current window. For each right pointer, add nums[right] to the window, update the pair count, and move the left pointer rightward as long as the window has at least k pairs. For each position where the window is valid, all subarrays ending at 'right' and starting at or before 'left' are good.
 *
 * @complexity Time: O(n)  Space: O(n)
 *
 * @param {number[]} nums - The input array
 * @param {number} k - Minimum number of equal pairs required
 * @return {number} Number of good subarrays
 */
const countGood = (nums, k) => {
  const freq = new Map()
  let [left, pairs, result] = [0, 0, 0]
  for (let right = 0; right < nums.length; ++right) {
    const v = nums[right]
    const count = freq.get(v) ?? 0
    pairs += count
    freq.set(v, count + 1)
    while (pairs >= k) {
      result += nums.length - right
      const lv = nums[left++]
      freq.set(lv, freq.get(lv) - 1)
      pairs -= freq.get(lv)
    }
  }
  return result
}
