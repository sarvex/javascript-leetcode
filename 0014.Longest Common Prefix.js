/**
 * Prefix shortening approach
 * 
 * @intuition
 * Start with the first string as the prefix and progressively shorten it until it's a prefix of all strings.
 * 
 * @approach
 * Use the first string as the initial prefix and progressively shorten it until it matches all strings.
 * 
 * @complexity
 * Time complexity: O(S), where S is the sum of all characters in all strings
 * Space complexity: O(1), only constant extra space is used
 * 
 * @param {string[]} strings - Array of strings to find common prefix
 * @return {string} - The longest common prefix
 */
const longestCommonPrefix = (strings) => {
  if (!strings.length) return '';
  
  let commonPrefix = strings[0];
  
  for (const currentString of strings.slice(1)) {
    while (!currentString.startsWith(commonPrefix)) {
      commonPrefix = commonPrefix.substring(0, commonPrefix.length - 1);
      if (commonPrefix === '') return '';
    }
  }
  
  return commonPrefix;
};
