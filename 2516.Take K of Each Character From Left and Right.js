/**
 * @param {string} s - The input string containing only characters 'a', 'b', and 'c'
 * @param {number} k - The required number of each character to take
 * @return {number} - The minimum number of operations needed, or -1 if impossible
 *
 * Approach:
 * 1. Count the total occurrences of each character in the string
 * 2. If any character appears fewer than k times, return -1 (impossible)
 * 3. Use sliding window to find the maximum subarray that can be left untouched
 *    - This subarray can contain at most (totalCount - k) of each character
 * 4. The answer is the total length minus the maximum valid subarray length
 *
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(1) as we only use a constant amount of variables
 */
const takeCharacters = (s, k) => {
  const ASCII = 97
  // Using array indices: 0 for 'a', 1 for 'b', 2 for 'c'
  const getCharIndex = (char) => char.charCodeAt(0) - ASCII

  const totalCharCounts = [0, 0, 0] // [a, b, c]

  for (const char of s) {
    totalCharCounts[getCharIndex(char)]++
  }

  if (totalCharCounts[0] < k || totalCharCounts[1] < k || totalCharCounts[2] < k) {
    return -1
  }

  const maxAllowedInWindow = [totalCharCounts[0] - k, totalCharCounts[1] - k, totalCharCounts[2] - k]

  // Sliding window to find the maximum subarray that can be left untouched
  const stringLength = s.length
  let windowStart = 0
  let maxWindowLength = 0
  const windowCounts = [0, 0, 0] // [a, b, c]

  for (let windowEnd = 0; windowEnd < stringLength; windowEnd++) {
    const currentCharIndex = getCharIndex(s[windowEnd])
    windowCounts[currentCharIndex]++

    while (
      windowCounts[0] > maxAllowedInWindow[0] ||
      windowCounts[1] > maxAllowedInWindow[1] ||
      windowCounts[2] > maxAllowedInWindow[2]
    ) {
      const leftCharIndex = getCharIndex(s[windowStart])
      windowCounts[leftCharIndex]--
      windowStart++
    }

    maxWindowLength = Math.max(maxWindowLength, windowEnd - windowStart + 1)
  }

  return stringLength - maxWindowLength
}
