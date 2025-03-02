/**
 * @param {number} low
 * @param {number} high
 * @param {number} zero
 * @param {number} one
 * @return {number}
 */
var countGoodStrings = function (low, high, zero, one) {
  const mod = 1e9 + 7 // Constant modulus to prevent overflow and keep results within bounds.
  const dp = new Int32Array(high + 1) // Array to store the number of ways to construct strings of length `i`.
  let res = 0 // Variable to accumulate the total number of "good" strings in the range [low, high].
  dp[0] = 1 // Base case: There is exactly one way to construct an empty string (length 0).

  // Iterate through all possible string lengths from 1 to `high`.
  for (let i = 1; i <= high; i++) {
    // If the current length `i` can include `zero` characters '0',
    // add the ways to construct strings of length `i - zero`.
    if (i >= zero) dp[i] = (dp[i] + dp[i - zero]) % mod

    // If the current length `i` can include `one` characters '1',
    // add the ways to construct strings of length `i - one`.
    if (i >= one) dp[i] = (dp[i] + dp[i - one]) % mod

    // If the current length `i` is within the valid range [low, high],
    // add the count of strings of this length to the result.
    if (i >= low) res = (res + dp[i]) % mod
  }

  // Return the total number of "good" strings modulo `mod`.
  return res
}
