/**
 * Reverses the order of words in a string while preserving whitespace between words.
 *
 * @intuition
 * The problem requires reversing the order of words, not characters. We can leverage
 * JavaScript's built-in string methods to split the string into words, reverse the array,
 * and join them back together.
 *
 * @approach
 * 1. Trim the string to remove leading and trailing whitespace
 * 2. Split the string by one or more whitespace characters using regex
 * 3. Reverse the resulting array of words
 * 4. Join the words with a single space character
 *
 * @complexity
 * Time: O(n) where n is the length of the string
 * Space: O(n) for storing the array of words
 *
 * @param {string} s - The input string to process
 * @returns {string} - The string with words in reverse order
 */
const reverseWords = (s) => s.trim().split(/\s+/).reverse().join(' ')
