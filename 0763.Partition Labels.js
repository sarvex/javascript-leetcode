/**
 * Greedy approach with early termination optimization
 * 
 * @intuition
 * To partition the string, we need to ensure each character appears in exactly one part.
 * By tracking the last occurrence of each character and using early termination with continue,
 * we can efficiently determine partition boundaries without unnecessary comparisons.
 * 
 * @approach
 * 1. Create a map to store the last index of each character
 * 2. Iterate through the string, incrementing partition size and tracking max last index
 * 3. Use early termination (continue) when max > current index to skip unnecessary checks
 * 4. When we reach a partition boundary, reset counters and add partition size to result
 * 
 * @complexity
 * Time: O(n) where n is the length of the string
 * Space: O(1) as we use a fixed-size array of 26 characters
 * 
 * @param {string} s - The input string to be partitioned
 * @return {number[]} - Array of partition lengths
 */
const partitionLabels = (s) => {
  const getCharIndex = char => char.charCodeAt(0) - 'a'.charCodeAt(0);
  const lastIndex = Array(26).fill(-1);
  
  // Record the last occurrence of each character
  for (let i = 0; i < s.length; i++) {
    const charIndex = getCharIndex(s[i]);
    lastIndex[charIndex] = i;
  }
  
  const result = [];
  let partitionSize = 0;
  let maxLastSeen = 0;
  
  // Find partition boundaries with early termination
  for (let i = 0; i < s.length; i++) {
    partitionSize++;
    const charIndex = getCharIndex(s[i]);
    maxLastSeen = Math.max(maxLastSeen, lastIndex[charIndex]);
    
    // Early termination - continue building current partition
    if (maxLastSeen > i) {
      continue;
    }
    
    // Found a partition boundary
    result.push(partitionSize);
    partitionSize = 0;
    maxLastSeen = 0;
  }
  
  return result;
};
