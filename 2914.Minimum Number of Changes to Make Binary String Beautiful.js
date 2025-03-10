/**
 * Calculates the minimum number of character changes needed to make a binary string beautiful.
 * A binary string is considered beautiful if every adjacent pair of characters are the same.
 * 
 * @param {string} s - The binary string to be made beautiful
 * @return {number} - Minimum number of character changes required
 * 
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(1) as we only use a single counter variable
 */
const minChanges = (s) => {
  let changeCount = 0;
  
  // Process the string in pairs (i, i+1)
  for (let i = 0; i < s.length; i += 2) {
    // If characters at positions i and i+1 are different, one change is needed
    changeCount += Number(s[i] !== s[i + 1]);
  }
  
  return changeCount;
}
