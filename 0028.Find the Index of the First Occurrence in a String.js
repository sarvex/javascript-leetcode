/**
 * Brute Force - Iterate through haystack and check for needle match at each position
 * 
 * @intuition
 * Compare each substring of haystack with the needle to find the first occurrence.
 * 
 * @approach
 * 1. Handle edge cases: if needle length equals haystack length, compare directly
 * 2. Iterate through haystack up to (haystack.length - needle.length)
 * 3. For each position, check if substring matches needle
 * 4. Return index of first match or -1 if not found
 * 
 * @complexity
 * Time: O(m*n) where m is haystack length and n is needle length
 * Space: O(1) using only constant extra space
 * 
 * @param {string} haystack - String to search within
 * @param {string} needle - Pattern to search for
 * @return {number} - Index of first occurrence or -1 if not found
 */
const strStr = (haystack, needle) => {
  const haystackLen = haystack.length;
  const needleLen = needle.length;
  
  // Edge case: if lengths are equal, compare directly
  if (haystackLen === needleLen) {
    return haystack === needle ? 0 : -1;
  }
  
  // Iterate through possible starting positions
  for (let i = 0; i <= haystackLen - needleLen; i++) {
    let j;
    for (j = 0; j < needleLen; j++) {
      if (haystack[i + j] !== needle[j]) {
        break;
      }
    }
    // If we matched the entire needle
    if (j === needleLen) return i;
  }
  
  return -1;
};
