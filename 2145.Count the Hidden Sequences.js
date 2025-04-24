/**
 * Prefix Sum Range Bounding | Early return if prefix sum range exceeds bounds
 * @intuition Track prefix sum min/max, exit early if range can't fit in [lower, upper]
 * @approach Use single pass, update min/max prefix sum, return 0 if range too large
 * @complexity
 *   Time: O(n)
 *   Space: O(1)
 * @param {number[]} differences - differences between consecutive elements
 * @param {number} lower - lower bound for sequence values
 * @param {number} upper - upper bound for sequence values
 * @returns {number} number of valid hidden sequences
 */
const numberOfArrays = (differences, lower, upper) => {
  let min = 0,
    max = 0,
    cur = 0
  for (const d of differences) {
    cur += d
    min = Math.min(min, cur)
    max = Math.max(max, cur)
    if (max - min > upper - lower) return 0
  }
  return upper - lower - (max - min) + 1
}
