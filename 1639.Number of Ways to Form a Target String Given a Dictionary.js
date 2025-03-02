/**
 * @param {string[]} words - Array of words of equal length forming the dictionary
 * @param {string} target - The target string we want to form
 * @return {number} - Number of ways to form target string (modulo 10^9 + 7)
 *
 * Problem: 1639. Number of Ways to Form a Target String Given a Dictionary
 *
 * Approach:
 * 1. Count character frequencies at each position across all dictionary words
 * 2. Use dynamic programming to calculate ways to form target
 * 3. For each position in words, update the number of ways to form each prefix of target
 *
 * Time Complexity: O(W * (N + T)), where:
 *   - W is the length of each word in the dictionary
 *   - N is the number of words in the dictionary
 *   - T is the length of the target string
 *
 * Space Complexity: O(T) for the dp array
 */
const numWays = (words, target) => {
  const ASCII = 97
  const ALPHABETS = 26
  const OVERFLOW = 1e9 + 7
  const targetLength = target.length
  const wordLength = words[0].length

  // Early return if it's impossible to form the target
  if (wordLength < targetLength) return 0

  // dp[i] represents the number of ways to form target[0...i-1]
  const dp = new Array(targetLength + 1).fill(0)
  dp[0] = 1 // Empty string can be formed in 1 way

  // Pre-compute character frequency at each position in the dictionary
  const charFrequency = Array(wordLength)
    .fill(0)
    .map(() => Array(ALPHABETS).fill(0))

  // Count frequency of each character at each position across all words
  for (let i = 0; i < wordLength; i++) {
    for (const word of words) {
      const charCode = word.charCodeAt(i) - ASCII
      charFrequency[i][charCode]++
    }
  }

  // Dynamic programming to build the solution
  for (let i = 0; i < wordLength; i++) {
    // Process target characters from right to left to avoid counting the same position twice
    for (let j = targetLength - 1; j >= 0; j--) {
      const charCode = target.charCodeAt(j) - ASCII

      // If the current character appears at position i in any dictionary word
      if (charFrequency[i][charCode] > 0) {
        // Add the number of ways to form target[0...j-1] multiplied by the frequency
        // of the current character at position i
        dp[j + 1] = (dp[j + 1] + dp[j] * charFrequency[i][charCode]) % OVERFLOW
      }
    }
  }

  return dp[targetLength]
}
