/**
 * @tagline Prime product hash for O(nk) anagram grouping
 * @intuition Each lowercase letter maps to a unique prime; the product of primes for a word is unique for its anagram group.
 * @approach Hash words by the product of letter primes, group by hash, and return the grouped values.
 * @complexity Time: O(nk) where n = words.length, k = avg word length
 * @complexity Space: O(nk) for storing all strings in groups
 * @param {string[]} words - List of words to group
 * @returns {string[][]} - Grouped anagrams
 */
const groupAnagrams = (words) => {
  const letterPrime = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101,
  ]
  const groups = new Map()
  for (const word of words) {
    let hash = 1n
    for (const char of word) hash *= BigInt(letterPrime[char.charCodeAt(0) - 97])
    groups.has(hash) ? groups.get(hash).push(word) : groups.set(hash, [word])
  }
  return [...groups.values()]
}
