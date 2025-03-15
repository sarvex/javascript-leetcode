/**
 * Merges two strings by alternating characters from each string.
 * @param {string} word1 - The first string to merge
 * @param {string} word2 - The second string to merge
 * @return {string} - The merged string with alternating characters
 * 
 * @intuition
 * We can merge two strings by taking characters alternately from each string.
 * After exhausting the shorter string, we append the remaining characters from the longer string.
 * 
 * @approach
 * 1. Determine the minimum length between both strings
 * 2. Iterate through both strings up to the minimum length, adding characters alternately
 * 3. Append any remaining characters from the longer string
 * 4. Return the merged result
 * 
 * @complexity
 * Time complexity: O(m + n), where m and n are the lengths of the input strings
 * Space complexity: O(m + n) for the result string
 */
const mergeAlternately = (word1, word2) => {
  const m = word1.length;
  const n = word2.length;
  const minLength = Math.min(m, n);
  
  let result = '';
  
  // Add characters alternately up to the length of the shorter string
  for (let i = 0; i < minLength; ++i) {
    result += word1[i] + word2[i];
  }
  
  // Append remaining characters from the longer string
  result += m > minLength ? word1.substring(minLength) : word2.substring(minLength);
  
  return result;
};
