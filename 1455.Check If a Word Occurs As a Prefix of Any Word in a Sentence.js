/**
 * Returns the 1-based index of the first word in a sentence that starts with a given prefix, or -1 if none exists.
 *
 * @param {string} sentence - The sentence to search.
 * @param {string} prefix - The prefix to match.
 * @return {number} The 1-based index of the matching word or -1.
 */
const isPrefixOfWord = (sentence, prefix) => {
  const words = sentence.split(/\s+/)
  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    if (words[wordIndex].startsWith(prefix)) {
      return wordIndex + 1
    }
  }
  return -1
}
