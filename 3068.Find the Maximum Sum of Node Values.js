/**
 * Dynamic Programming with State Tracking
 *
 * @intuition
 * We need to maximize the sum by XORing some elements with k. Since XORing twice
 * with the same value returns the original value, we only need to track whether
 * we've made an even or odd number of XOR operations.
 *
 * @approach
 * Use dynamic programming with two states:
 * - f0: maximum sum with even number of XOR operations (including zero)
 * - f1: maximum sum with odd number of XOR operations
 * For each number, we have two choices: keep it as is or XOR it with k.
 * We update both states based on these choices and return f0 (even operations).
 *
 * @complexity
 * Time complexity: O(n) where n is the length of nums array
 * Space complexity: O(1) as we only use two variables
 *
 * @param {number[]} nums - Array of node values
 * @param {number} k - The value to XOR with
 * @param {number[][]} edges - Array of edges connecting nodes
 * @return {number} Maximum possible sum of node values
 */
const maximumValueSum = (nums, k, edges) => {
  let [f0, f1] = [0, -Infinity]

  for (const x of nums) {
    ;[f0, f1] = [Math.max(f0 + x, f1 + (x ^ k)), Math.max(f1 + x, f0 + (x ^ k))]
  }

  return f0
}
