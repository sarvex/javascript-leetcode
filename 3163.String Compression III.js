/**
 * Compresses a string by replacing consecutive identical characters with their count followed by the character.
 * Limits consecutive character counts to a maximum of 9.
 *
 * @param {string} word - The input string to compress
 * @return {string} - The compressed string
 * @time O(n) - Where n is the length of the input string
 * @space O(n) - For storing the compressed string
 */
const compressedString = (word) => {
  let result = '';
  let index = 0;
  
  while (index < word.length) {
    // Count consecutive identical characters (up to 9)
    let count = 1;
    while (index + 1 < word.length && word[index] === word[index + 1]) {
      if (count === 9) {
        break; // Limit to maximum of 9 consecutive characters
      }
      count++;
      index++;
    }
    
    // Add the count and character to the result
    result += count + word[index];
    index++;
  }
  
  return result;
}
