/**
 * Sliding Window Index Tracking for Fixed Bounds Subarrays
 *
 * @intuition
 * Use index tracking to efficiently count valid subarrays by maintaining the last seen positions of minK, maxK, and any out-of-bounds element.
 *
 * @approach
 * Iterate through nums using a for loop, updating the last seen indices for minK, maxK, and invalid values. For each position, the number of valid subarrays ending there is determined by the distance from the last invalid index to the closer of the last minK or maxK index.
 *
 * @complexity
 * Time: O(n) — Single pass through the array.
 * Space: O(1) — Constant extra space for indices.
 *
 * @param {number[]} nums - The input array of integers.
 * @param {number} minK - The fixed minimum bound for subarrays.
 * @param {number} maxK - The fixed maximum bound for subarrays.
 * @returns {number} The count of subarrays with fixed bounds.
 */
const countSubarrays = (nums, minK, maxK) => {
  let totalCount = 0
  let lastMinIndex = -1
  let lastMaxIndex = -1
  let lastInvalidIndex = -1

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    if (num === minK) lastMinIndex = i
    if (num === maxK) lastMaxIndex = i
    if (num < minK || num > maxK) lastInvalidIndex = i
    const validStart = Math.min(lastMinIndex, lastMaxIndex)
    totalCount += Math.max(validStart - lastInvalidIndex, 0)
  }

  return totalCount
}
