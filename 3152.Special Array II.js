/**
 * @param {number[]} nums - The input array of integers
 * @param {number[][]} queries - Array of query pairs [start, end] representing index ranges
 * @return {boolean[]} - Array of booleans indicating if each query range is special
 *
 * A range is special if all adjacent elements have different parity (odd/even).
 * Time Complexity: O(n + q) where n is nums length and q is queries length
 * Space Complexity: O(n) for the prefix array
 */
const isArraySpecial = (nums, queries) => {
  const [m, n] = [queries.length, nums.length]
  const result = Array.from({ length: m }).fill(false)
  const prefix = Array.from({ length: n }).fill(0)

  for (let i = 1; i < n; i++) {
    if (nums[i] % 2 === nums[i - 1] % 2) {
      prefix[i] = prefix[i - 1] + 1
    } else {
      prefix[i] = prefix[i - 1]
    }
  }

  for (let i = 0; i < m; i++) {
    const [start, end] = queries[i]
    result[i] = prefix[end] - prefix[start] === 0
  }

  return result
}
