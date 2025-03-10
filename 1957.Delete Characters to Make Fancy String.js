/**
 * @param {string} s - The input string to be converted to a fancy string
 * @return {string} - The resulting fancy string after removing characters
 * @description
 * A fancy string is one where no three consecutive characters are equal.
 * This function removes the minimum number of characters from the input string
 * to make it fancy.
 *
 * Approach:
 * 1. Track the current character and its consecutive count
 * 2. Only add characters to the result if they don't create three consecutive occurrences
 * 3. Reset the count when encountering a different character
 *
 * Time Complexity: O(n) where n is the length of the input string
 * Space Complexity: O(n) for storing the result string
 */
const makeFancyString = (s) => {
  // Handle edge cases
  if (!s || s.length <= 2) {
    return s;
  }

  // Initialize with the first character
  let previous = s[0];
  let result = previous;
  let consecutive = 1;

  // Process the string character by character
  for (let i = 1; i < s.length; i++) {
    const current = s[i];

    if (current === previous) {
      consecutive++;

      if (consecutive < 3) {
        result += current;
      }
    } else {
      // Reset for a new character
      previous = current;
      consecutive = 1;
      result += current;
    }
  }

  return result;
};
