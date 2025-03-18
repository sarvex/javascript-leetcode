/**
 * Determines if a string matches a given regular expression pattern.
 * 
 * @param {string} s - The input string to match against the pattern
 * @param {string} p - The regular expression pattern
 * @return {boolean} - True if the string matches the pattern, false otherwise
 * 
 * @intuition
 * This is a pattern matching problem where we need to handle two special characters:
 * '.' which matches any single character, and '*' which matches zero or more of the preceding element.
 * Dynamic programming with memoization is a good approach since there are overlapping subproblems.
 * 
 * @approach
 * Use a top-down DP approach with memoization:
 * 1. Create a memoization table to store results of subproblems
 * 2. Define a recursive function that handles different cases:
 *    - If we've reached the end of pattern, check if we've also reached end of string
 *    - If next character is '*', we have two choices:
 *      a. Skip the pattern with '*' (use zero occurrences)
 *      b. Use current match and keep the '*' pattern for next iterations
 *    - If current characters match (or pattern has '.'), move both pointers forward
 * 3. Memoize results to avoid recalculating
 * 
 * @complexity
 * Time: O(m*n) where m is length of string and n is length of pattern
 * Space: O(m*n) for the memoization table
 */
const isMatch = (s, p) => {
  const m = s.length;
  const n = p.length;
  // Memoization table: -1 (not calculated), 0 (false), 1 (true)
  const memo = Array.from({ length: m + 1 }, () => Array(n + 1).fill(-1));
  
  const dfs = (i, j) => {
    // Base case: if we've reached the end of pattern
    if (j >= n) {
      return i === m; // Match only if we've also reached end of string
    }
    
    // Return memoized result if available
    if (memo[i][j] !== -1) {
      return memo[i][j] === 1;
    }
    
    let result = false;
    
    // Handle pattern with '*'
    if (j + 1 < n && p[j + 1] === '*') {
      // Either skip the pattern with '*' (use zero occurrences)
      // Or use current match and keep the '*' pattern
      result = dfs(i, j + 2) || 
               (i < m && (s[i] === p[j] || p[j] === '.') && dfs(i + 1, j));
    } 
    // Handle normal character or '.' match
    else if (i < m && (s[i] === p[j] || p[j] === '.')) {
      result = dfs(i + 1, j + 1);
    }
    
    // Memoize the result
    memo[i][j] = result ? 1 : 0;
    return result;
  };
  
  return dfs(0, 0);
};
