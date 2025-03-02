/**
 * @param {string[]} words - Array of strings to check for prefix-suffix pairs
 * @return {number} - Number of valid prefix-suffix pairs found
 *
 * @description
 * This function counts the number of pairs (i, j) where:
 * - 0 <= i < j < words.length
 * - words[i] is both a prefix and suffix of words[j]
 *
 * Algorithm:
 * 1. Iterate through each possible pair of words (i, j) where i < j
 * 2. For each pair, check if words[i] is both a prefix and suffix of words[j]
 * 3. Count the number of valid pairs
 *
 * Time Complexity: O(n²·m) where n is the length of words array and m is the average length of words
 * Space Complexity: O(1) - constant extra space used
 */
const countPrefixSuffixPairs = (words) => {
  const isPrefixAndSuffix = (potentialMatch, targetString) => {
    // Early return if potentialMatch is longer than targetString
    if (potentialMatch.length > targetString.length) {
      return false
    }

    // Check prefix - compare characters from the beginning
    for (let i = 0; i < potentialMatch.length; i++) {
      if (potentialMatch[i] !== targetString[i]) {
        return false
      }
    }

    // Check suffix - compare characters from the end
    const offset = targetString.length - potentialMatch.length
    for (let i = 0; i < potentialMatch.length; i++) {
      if (potentialMatch[i] !== targetString[i + offset]) {
        return false
      }
    }

    return true
  }

  let pairCount = 0

  for (let i = 0; i < words.length; i++) {
    const currentWord = words[i]

    for (let j = i + 1; j < words.length; j++) {
      const targetWord = words[j]

      if (isPrefixAndSuffix(currentWord, targetWord)) {
        pairCount++
      }
    }
  }

  return pairCount
}
