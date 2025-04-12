/**
 * Optimized Two-Pointer Backtracking approach for wildcard pattern matching.
 * @tagline Two-pointer iteration with backtracking for '*'.
 * @intuition Instead of DP, we can iterate through the string `s` and pattern `p` using pointers. When a `*` is encountered in `p`, we save its position and the corresponding position in `s`. If a mismatch occurs later, we can backtrack to the last `*` and try matching one more character in `s` with that `*`.
 * @approach
 * The solution employs a two-pointer technique combined with backtracking to handle the '*' wildcard efficiently.
 * We use one pointer (`stringIndex`) for the input string `s` and another (`patternIndex`) for the pattern `p`.
 * The core idea is to advance both pointers when characters match or when the pattern has a '?'.
 * When a '*' is encountered in the pattern, its position (`lastStarPatternIndex`) and the corresponding string position (`lastStarMatchStringIndex`) are saved. The pattern pointer advances, effectively treating the '*' as matching zero characters initially.
 * If a mismatch occurs later, and a '*' was previously saved, we backtrack: the pattern pointer is reset to the position *after* the saved '*', and the string pointer is advanced from the saved match position. This allows the '*' to match one more character from the string.
 * This backtracking continues until either a match is found or it's determined that the saved '*' cannot lead to a match.
 * After iterating through the string, any remaining '*' characters at the end of the pattern are skipped.
 * The match is successful only if the pattern pointer reaches the end of the pattern. This approach avoids the O(m*n) space complexity of DP by using constant extra space for the pointers and saved star state.
 * @complexity
 * Time: O(m * n) in the worst case, where m = s.length and n = p.length. Often performs better in practice.
 * Space: O(1) - uses only a few variables for pointers and indices.
 * @param {string} s The input string.
 * @param {string} p The wildcard pattern.
 * @returns {boolean} True if the string matches the pattern, false otherwise.
 */
const isMatch = (s, p) => {
  let stringIndex = 0
  let patternIndex = 0
  let lastStarPatternIndex = -1
  let lastStarMatchStringIndex = 0

  while (stringIndex < s.length) {
    // If characters match or pattern has '?', move both pointers
    if (
      patternIndex < p.length &&
      (p[patternIndex] === '?' || s[stringIndex] === p[patternIndex])
    ) {
      stringIndex++
      patternIndex++
    }
    // If pattern has '*', store its position and try matching zero characters first
    else if (patternIndex < p.length && p[patternIndex] === '*') {
      lastStarPatternIndex = patternIndex
      lastStarMatchStringIndex = stringIndex
      patternIndex++
    }
    // If mismatch occurs and '*' was encountered before, backtrack to '*' and try matching one more character
    else if (lastStarPatternIndex !== -1) {
      patternIndex = lastStarPatternIndex + 1
      lastStarMatchStringIndex++
      stringIndex = lastStarMatchStringIndex
    }
    // No match found
    else {
      return false
    }
  }

  // Ensure remaining characters in pattern are '*' (as '*' can match empty)
  while (patternIndex < p.length && p[patternIndex] === '*') {
    patternIndex++
  }

  return patternIndex === p.length
}
