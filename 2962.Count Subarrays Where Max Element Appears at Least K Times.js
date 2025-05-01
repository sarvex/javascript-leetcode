/**
 * Tagline: Sliding window for counting subarrays with max element at least k times
 * @intuition Find the max, then use a window to count valid subarrays as soon as max appears k times
 * @approach Track max value, count of max in window, and move left pointer to maintain exactly k maxes, summing all valid starts
 * @complexity Time: O(n), Space: O(1)
 * @param {number[]} nums - The input array
 * @param {number} k - Minimum times max element must appear in subarray
 * @returns {number} Count of subarrays where max appears at least k times
 */
const countSubarrays = (nums, k) => {
  const max = Math.max(...nums)
  let [count, left, maxFreq] = [0, 0, 0]

  nums.forEach((num, right) => {
    if (num === max) maxFreq++
    while (maxFreq === k) {
      if (nums[left++] === max) maxFreq--
    }
    count += left
  })
  return count
}
