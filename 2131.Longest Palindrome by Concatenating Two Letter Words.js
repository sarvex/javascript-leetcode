/**
 * Find the length of the longest palindrome formed by concatenating two-letter words
 * @param {string[]} words - Array of 2-letter words
 * @return {number} - Length of the longest palindrome
 *
 * @intuition
 * For two-letter words, a palindrome can be formed in two ways:
 * 1. Pair of reverse words (e.g., "ab" and "ba")
 * 2. Single word with same letters (e.g., "aa") in the middle
 *
 * @approach
 * 1. Count frequency of each word
 * 2. For each word, check if its reverse exists
 * 3. For words with same letters, handle them separately
 * 4. Add min(count[word], count[reverse]) * 4 to length
 * 5. For middle word with same letters, add 2 if any remaining
 */
const longestPalindrome = (words) => {
  const freq = {}
  let length = 0
  let hasCentral = false

  // Count frequency of each word
  for (const word of words) {
    freq[word] = (freq[word] || 0) + 1
  }

  const processed = new Set()

  for (const word of Object.keys(freq)) {
    if (processed.has(word)) continue

    if (word[0] === word[1]) {
      // Handle words with same letters
      const count = freq[word]
      const pairs = Math.floor(count / 2)
      length += pairs * 4
      if (count % 2 === 1) hasCentral = true
    } else {
      // Handle words with different letters
      const reverse = word[1] + word[0]
      if (freq[reverse] !== undefined) {
        const min = Math.min(freq[word], freq[reverse])
        length += min * 4
        processed.add(reverse)
      }
    }
    processed.add(word)
  }

  // Add 2 for the central word if any remaining same-letter word
  if (hasCentral) length += 2

  return length
}
