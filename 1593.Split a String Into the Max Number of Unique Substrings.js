/**
 * Splits a string into the maximum number of unique substrings
 * 
 * @intuition
 * We can use backtracking to try all possible ways to split the string.
 * For each position, we try to create a new substring and recursively process
 * the remaining part of the string. We use a set to track unique substrings.
 * 
 * @approach
 * 1. Use a depth-first search (DFS) approach with backtracking
 * 2. For each starting position, try all possible ending positions
 * 3. If the substring is unique (not in our set), add it and continue DFS
 * 4. Use pruning: if remaining characters + current set size ≤ current max, skip
 * 5. Track the maximum set size encountered during the search
 * 
 * @param {string} s - The input string to be split
 * @return {number} - Maximum number of unique substrings possible
 * 
 * @complexity
 * Time: O(2^n) where n is the length of the string (each character has two choices: split or not)
 * Space: O(n) for the recursion stack and the set of unique substrings
 */
const maxUniqueSplit = (s) => {
  const stringLength = s.length;
  const uniqueSubstrings = new Set();
  let maxCount = 0;
  
  const dfs = (startIndex) => {
    // Pruning: if remaining potential + current count ≤ max, no need to continue
    if (uniqueSubstrings.size + stringLength - startIndex <= maxCount) {
      return;
    }
    
    // Base case: reached the end of string
    if (startIndex >= stringLength) {
      maxCount = Math.max(maxCount, uniqueSubstrings.size);
      return;
    }
    
    // Try all possible substrings starting from current position
    for (let endIndex = startIndex + 1; endIndex <= stringLength; ++endIndex) {
      const substring = s.slice(startIndex, endIndex);
      
      // If this substring is unique, add it and continue DFS
      if (!uniqueSubstrings.has(substring)) {
        uniqueSubstrings.add(substring);
        dfs(endIndex);
        uniqueSubstrings.delete(substring); // Backtrack
      }
    }
  };
  
  dfs(0);
  return maxCount;
};
