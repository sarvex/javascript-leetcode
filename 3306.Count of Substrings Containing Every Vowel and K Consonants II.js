/**
 * Counts the number of substrings containing all five vowels and exactly k consonants.
 *
 * The approach uses a sliding window technique with the principle of inclusion-exclusion:
 * - Count substrings with at most k consonants (all vowels must be present)
 * - Subtract substrings with at most (k-1) consonants
 * - The difference gives us substrings with exactly k consonants
 *
 * @param {string} word - The input string to analyze
 * @param {number} k - The exact number of consonants required in each substring
 * @return {number} - Count of valid substrings
 *
 * Time Complexity: O(n) where n is the length of the word
 * Space Complexity: O(1) as we only use a constant amount of extra space
 */
const countOfSubstrings = (word, k) => {
  const hasAllVowels = (a, e, i, o, u) => {
    return a > 0 && e > 0 && i > 0 && o > 0 && u > 0
  }

  const countSubstrings = (word, key) => {
    // Counters for each vowel
    let [a, e, i, o, u] = [0, 0, 0, 0, 0]
    let validSubstringsCount = 0
    let consonantsCount = 0

    // Sliding window pointers
    let leftPointer = 0

    // Process each character in the word
    for (let rightPointer = 0; rightPointer < word.length; rightPointer++) {
      const currentChar = word[rightPointer]

      // Update vowel counters or consonant count
      switch (currentChar) {
        case 'a':
          a++
          break
        case 'e':
          e++
          break
        case 'i':
          i++
          break
        case 'o':
          o++
          break
        case 'u':
          u++
          break
        default:
          consonantsCount++ // Character is a consonant
      }

      // Shrink window if we have all vowels and too many consonants
      while (hasAllVowels(a, e, i, o, u) && consonantsCount > key) {
        const leftChar = word[leftPointer++]

        // Update counters when removing character from window
        switch (leftChar) {
          case 'a':
            a--
            break
          case 'e':
            e--
            break
          case 'i':
            i--
            break
          case 'o':
            o--
            break
          case 'u':
            u--
            break
          default:
            consonantsCount-- // Character is a consonant
        }
      }

      // Add count of valid substrings ending at rightPointer
      validSubstringsCount += rightPointer - leftPointer + 1
    }

    return validSubstringsCount
  }

  return countSubstrings(word, k) - countSubstrings(word, k - 1)
}
