/**
 * @intuition
 * Instead of checking all possible prefixes, we can sort the words lexicographically.
 * After sorting, words with the same prefix will be adjacent. The common prefix between
 * the first and last word in a window of k words will be the common prefix for all words in that window.
 *
 * @approach
 * 1. Sort the words while keeping track of their original indices
 * 2. For each possible window of k words in the sorted array, find the common prefix length
 * 3. Track the longest and second longest common prefix lengths
 * 4. For each word, if removing it affects the window with the longest prefix, use the second longest prefix
 *
 * @complexity
 * Time: O(n log n + n * L), where n is the length of words array and L is the maximum length of a word
 * Space: O(n), for storing the indices and answer array
 *
 * @param {string[]} words
 * @param {number} k
 * @return {number[]}
 */
const longestCommonPrefix = (words, k) => {
  const n = words.length

  // Edge case: if k equals n, no valid answer possible after removal
  if (k === n) return Array(n).fill(0)

  // Create indices array and sort based on corresponding words
  const indices = Array.from({ length: n }, (_, i) => i).sort((a, b) => words[a].localeCompare(words[b]))

  // Find common prefix length between two strings
  const getPrefixLength = (a, b) => {
    const minLength = Math.min(a.length, b.length)
    let i = 0
    while (i < minLength && a[i] === b[i]) i++
    return i
  }

  // Track best window information
  let longest = -1
  let longestWindowStart = -1
  let secondLongest = -1

  // Check each possible window of k words
  for (let i = 0; i <= n - k; i++) {
    const firstWord = words[indices[i]]
    const lastWord = words[indices[i + k - 1]]
    const prefixLength = getPrefixLength(firstWord, lastWord)

    if (prefixLength >= longest) {
      secondLongest = longest
      longest = prefixLength
      longestWindowStart = i
    } else if (prefixLength > secondLongest) {
      secondLongest = prefixLength
    }
  }

  // Build answer array
  const answer = Array(n).fill(longest)

  // Update answers for words in the best window
  for (let i = 0; i < k; i++) {
    answer[indices[longestWindowStart + i]] = secondLongest
  }

  return answer
}
