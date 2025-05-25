/**
 * @tagline Linear scan with string includes method
 *
 * @intuition
 * We need to find all words that contain a specific character and return their indices.
 * The simplest approach is to iterate through each word and check if it contains the target character.
 *
 * @approach
 * 1. Create an empty array to store the indices of words containing the character
 * 2. Iterate through each word in the array
 * 3. Use the built-in includes() method to check if the word contains the character
 * 4. If it does, add the current index to our result array
 * 5. Return the result array
 *
 * @complexity
 * Time complexity: O(n * m) where n is the number of words and m is the average length of words
 * Space complexity: O(k) where k is the number of words containing the character
 *
 * @param {string[]} words - Array of words to check
 * @param {string} x - The character to search for
 * @return {number[]} - Indices of words containing the character
 */
const findWordsContaining = (words, x) => {
  const answer = []
  for (let i = 0; i < words.length; ++i) {
    if (words[i].includes(x)) {
      answer.push(i)
    }
  }
  return answer
}
