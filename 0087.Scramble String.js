/**
 * Dynamic Programming Check for Scrambled Strings
 * @intuition The core idea is to determine if two strings are scrambled versions of each other.
A string is scrambled if it can be represented as a binary tree by recursively partitioning it into two non-empty substrings.
Swapping the children of any non-leaf node creates a scrambled string.
This suggests a recursive structure that can be solved with dynamic programming.
We need to check if `s2` can be formed by scrambling `s1`.
 * @approach
We use a 3D dynamic programming table `dp[i][j][len]`, where `dp[i][j][len]` is true if the substring of `s1` starting at index `i` with length `len` is a scramble of the substring of `s2` starting at index `j` with length `len`.

The base case is when `len = 1`: `dp[i][j][1]` is true if `s1[i] === s2[j]`.

For lengths `k` from 2 to `n`, we iterate through all possible split points `h` (from 1 to `k-1`).
A substring `s1[i...i+k-1]` is a scramble of `s2[j...j+k-1]` if there exists a split point `h` such that either:
1. The first `h` characters of the `s1` substring match the first `h` characters of the `s2` substring (`dp[i][j][h]`), AND the remaining `k-h` characters also match (`dp[i+h][j+h][k-h]`). (No swap)
2. The first `h` characters of the `s1` substring match the last `h` characters of the `s2` substring (`dp[i][j+k-h][h]`), AND the remaining `k-h` characters of the `s1` substring match the first `k-h` characters of the `s2` substring (`dp[i+h][j][k-h]`). (Swap)

If either condition holds for any split point `h`, we set `dp[i][j][k]` to true.

The final answer is `dp[0][0][n]`, indicating whether the entire `s1` is a scramble of the entire `s2`.
 * @complexity
 * Time: O(n^4) - Three nested loops for `i`, `j`, `k` (up to n), and an inner loop for `h` (up to n).
 * Space: O(n^3) - For the 3D DP table.
 * @param {string} s1 The first string.
 * @param {string} s2 The second string.
 * @returns {boolean} True if s2 is a scrambled version of s1, false otherwise.
 */
const isScramble = (s1, s2) => {
  const n = s1.length
  if (n !== s2.length) {
    return false
  }
  if (s1 === s2) {
    return true
  }
  const countChars = (str) => {
    const counts = {}
    for (const char of str) {
      counts[char] = (counts[char] || 0) + 1
    }
    return counts
  }
  const s1Counts = countChars(s1)
  const s2Counts = countChars(s2)
  for (const char in s1Counts) {
    if (s1Counts[char] !== s2Counts[char]) {
      return false
    }
  }

  const dp = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => Array.from({ length: n + 1 }, () => false)),
  )

  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      dp[i][j][1] = s1[i] === s2[j]
    }
  }

  for (let k = 2; k <= n; ++k) {
    for (let i = 0; i <= n - k; ++i) {
      for (let j = 0; j <= n - k; ++j) {
        for (let h = 1; h < k; ++h) {
          // Case 1: No swap at this level
          // s1[i...i+h-1] vs s2[j...j+h-1] AND s1[i+h...i+k-1] vs s2[j+h...j+k-1]
          if (dp[i][j][h] && dp[i + h][j + h][k - h]) {
            dp[i][j][k] = true
            break // Found a valid split
          }
          // Case 2: Swap at this level
          // s1[i...i+h-1] vs s2[j+k-h...j+k-1] AND s1[i+h...i+k-1] vs s2[j...j+k-h-1]
          if (dp[i][j + k - h][h] && dp[i + h][j][k - h]) {
            dp[i][j][k] = true
            break // Found a valid split
          }
        }
      }
    }
  }

  return dp[0][0][n]
}
