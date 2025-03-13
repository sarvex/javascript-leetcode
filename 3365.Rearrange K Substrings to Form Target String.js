/**
 * Determines if it's possible to rearrange k substrings to form the target string.
 *
 * @intuition
 * We can divide both strings into k equal substrings and check if they contain the same substrings.
 * If both strings can be divided into the same set of substrings (regardless of order), then
 * it's possible to rearrange one to form the other.
 *
 * @approach
 * 1. Calculate the length of each substring (source length / k)
 * 2. Divide both strings into k substrings of equal length
 * 3. Count the frequency of each substring in both strings
 * 4. If the frequency counts match (every substring has net count of 0), return true
 *
 * @complexity
 * Time: O(n) where n is the length of the input strings
 * Space: O(k) where k is the number of substrings
 *
 * @param {string} s - The source string
 * @param {string} t - The target string
 * @param {number} k - Number of substrings to divide into
 * @return {boolean} - Whether it's possible to rearrange s to form t
 */
const isPossibleToRearrange = (s, t, k) => {
  const substringFrequency = {}
  const totalLength = s.length
  const substringLength = Math.floor(totalLength / k)

  for (let i = 0; i < totalLength; i += substringLength) {
    const sourceSubstring = s.slice(i, i + substringLength)
    const targetSubstring = t.slice(i, i + substringLength)

    substringFrequency[sourceSubstring] = (substringFrequency[sourceSubstring] || 0) + 1
    substringFrequency[targetSubstring] = (substringFrequency[targetSubstring] || 0) - 1
  }

  return Object.values(substringFrequency).every((count) => count === 0)
}
