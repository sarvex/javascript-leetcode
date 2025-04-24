/**
 * Dynamic programming with run-length encoding for Count and Say
 * @intuition Build each term from the previous using RLE, storing intermediate results for efficiency
 * @approach Use a DP array to store each sequence, and a helper for run-length encoding
 * @complexity Time: O(n * m), m = average length per sequence
 * @complexity Space: O(n * m), for DP storage
 * @param {number} n - The sequence index (1-based)
 * @returns {string} The nth term of the Count and Say sequence
 */
const countAndSay = (n) => {
  const rle = (s) => {
    return s.toString().replace(/(.)\1*/g, (group) => `${group.length}${group[0]}`)
  }
  return Array.from({ length: n }).reduce((seq, _, i) => (i === 0 ? '1' : rle(seq)), '')
}
