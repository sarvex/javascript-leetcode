/**
 * Sliding window DP for maximizing covered white tiles, then subtract for minimum uncovered
 *
 * @intuition Maximize the number of white tiles covered by carpets; uncovered = total - covered
 * @approach Use bottom-up DP with a sliding window to track covered tiles, iterating over tiles and carpets
 * @complexity Time: O(n * numCarpets)\nSpace: O(n * numCarpets)
 * @param {string} floor - String of '0' and '1' representing tiles
 * @param {number} numCarpets - Number of carpets available
 * @param {number} carpetLen - Length of each carpet
 * @returns {number} Minimum number of white tiles left uncovered
 */
const minimumWhiteTiles = (floor, numCarpets, carpetLen) => {
  const n = floor.length
  let all = 0
  let sum = 0
  const dp = Array.from({ length: n + 1 }, () => new Uint32Array(numCarpets + 1))
  for (let i = 0; i < n; ++i) {
    all += floor[i] === '1' ? 1 : 0
    sum += floor[i] === '1' ? 1 : 0
    if (i >= carpetLen) sum -= floor[i - carpetLen] === '1' ? 1 : 0
    for (let j = 0; j <= numCarpets; ++j) {
      if (!j) {
        dp[i][j] = 0
        continue
      }
      if (i < carpetLen) {
        dp[i][j] = sum
        continue
      }
      dp[i][j] = Math.max(dp[i - 1][j], dp[i - carpetLen][j - 1] + sum)
    }
  }
  return all - dp[n - 1][numCarpets]
}
