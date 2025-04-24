/**
 * Tagline: Hash map grouping for fast equal pair checks
 * @intuition Group indices by value to minimize redundant comparisons.
 * @approach Build a map of value → indices, then for each group, check all (i, j) pairs for divisibility.
 * @complexity Time: O(n * m), where m is the max count of any value
 * @complexity Space: O(n)
 * @param {number[]} nums - Array of integers
 * @param {number} k - Divisor
 * @returns {number} Number of valid pairs
 */
const countPairs = (nums, k) => {
  /** @type {Record<number, number[]>} */
  const indexGroups = {}
  nums.forEach((num, i) => (indexGroups[num] ??= []).push(i))
  return Object.values(indexGroups).reduce(
    (sum, indices) =>
      sum + indices.flatMap((i, idx) =>
        indices.slice(idx + 1).map(j => (i * j) % k === 0 ? 1 : 0)
      ).reduce((a, b) => a + b, 0),
    0
  )
}
