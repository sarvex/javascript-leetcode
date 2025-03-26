/**
 * Binary Search + KMP - Find the shortest substring containing all pattern segments
 * 
 * @intuition
 * The pattern p consists of segments separated by '*'. We need to find the shortest
 * substring in s that contains all these segments in order. We use KMP algorithm
 * to efficiently find all occurrences of each segment, then use binary search to
 * find the next valid segment position.
 * 
 * @approach
 * 1. Split the pattern by '*' and filter out empty segments
 * 2. Use KMP to find all occurrences of each segment in the string
 * 3. For each occurrence of the first segment, use binary search to find the
 *    earliest valid occurrence of subsequent segments
 * 4. Calculate minimum substring length that contains all segments in order
 * 
 * @complexity
 * Time: O(n + m + k log k) where n is the length of s, m is the length of p,
 *       and k is the number of occurrences of segments
 * Space: O(n + m) for storing the occurrences and KMP table
 * 
 * @param {string} inputString - The input string
 * @param {string} patternWithWildcards - The pattern with wildcards
 * @return {number} - Length of shortest matching substring or -1 if none exists
 */
const shortestMatchingSubstring = (inputString, patternWithWildcards) => {
  // Split pattern by '*' and filter out empty segments
  const patternSegments = [];
  const segmentPositions = [];
  
  // Extract all non-empty segments from the pattern
  for (const segment of patternWithWildcards.split('*')) {
    if (segment.length) {
      patternSegments.push(segment);
      segmentPositions.push(findAllPatternOccurrences(segment, inputString));
    }
  }
  
  // If no pattern segments (all wildcards), return 0
  const segmentCount = patternSegments.length;
  if (segmentCount === 0) return 0;
  
  // If any segment doesn't appear in the string, return -1
  if (segmentPositions.some(positions => positions.length === 0)) {
    return -1;
  }
  
  let minimumSubstringLength = Infinity;
  
  // For each occurrence of the first pattern segment
  for (const firstPosition of segmentPositions[0]) {
    // If only one segment, the answer is just the length of that segment
    if (segmentCount === 1) {
      minimumSubstringLength = Math.min(minimumSubstringLength, patternSegments[0].length);
    } 
    // For two segments
    else if (segmentCount === 2) {
      // Find the first occurrence of second segment after first segment + its length
      const nextPositionIndex = findFirstPositionGreaterOrEqual(
        segmentPositions[1],
        firstPosition + patternSegments[0].length
      );
      
      if (nextPositionIndex < segmentPositions[1].length) {
        const secondPosition = segmentPositions[1][nextPositionIndex];
        const substringLength = secondPosition + patternSegments[1].length - firstPosition;
        minimumSubstringLength = Math.min(minimumSubstringLength, substringLength);
      }
    } 
    // For three segments
    else if (segmentCount === 3) {
      // Find the first occurrence of second segment after first segment + its length
      const secondPositionIndex = findFirstPositionGreaterOrEqual(
        segmentPositions[1],
        firstPosition + patternSegments[0].length
      );
      
      if (secondPositionIndex < segmentPositions[1].length) {
        const secondPosition = segmentPositions[1][secondPositionIndex];
        
        // Find the first occurrence of third segment after second segment + its length
        const thirdPositionIndex = findFirstPositionGreaterOrEqual(
          segmentPositions[2],
          secondPosition + patternSegments[1].length
        );
        
        if (thirdPositionIndex < segmentPositions[2].length) {
          const thirdPosition = segmentPositions[2][thirdPositionIndex];
          const substringLength = thirdPosition + patternSegments[2].length - firstPosition;
          minimumSubstringLength = Math.min(minimumSubstringLength, substringLength);
        }
      }
    }
  }
  
  return minimumSubstringLength < Infinity ? minimumSubstringLength : -1;
  
  /**
   * Knuth-Morris-Pratt algorithm to find all starting indices of pattern in text
   * 
   * @param {string} searchPattern - Pattern to search for
   * @param {string} searchText - Text to search in
   * @return {number[]} - Array of starting indices where pattern occurs
   */
  function findAllPatternOccurrences(searchPattern, searchText) {
    // Build longest proper prefix which is also suffix array
    const prefixTable = [0];
    
    for (let i = 1, k = 0; i < searchPattern.length; ++i) {
      while (k && searchPattern[k] !== searchPattern[i]) k = prefixTable[k-1];
      if (searchPattern[k] === searchPattern[i]) ++k;
      prefixTable.push(k);
    }
    
    const startingPositions = [];
    
    // Find all occurrences using KMP algorithm
    for (let i = 0, k = 0; i < searchText.length; ++i) {
      while (k && (k === searchPattern.length || searchPattern[k] !== searchText[i])) {
        k = prefixTable[k-1];
      }
      
      if (searchPattern[k] === searchText[i]) ++k;
      
      if (k === searchPattern.length) {
        startingPositions.push(i - searchPattern.length + 1);
      }
    }
    
    return startingPositions;
  }
  
  /**
   * Binary search to find the leftmost index where value >= target
   * 
   * @param {number[]} sortedArray - Sorted array to search in
   * @param {number} targetValue - Value to search for
   * @return {number} - Index of the first element >= target, or array length if none
   */
  function findFirstPositionGreaterOrEqual(sortedArray, targetValue) {
    let leftBound = 0;
    let rightBound = sortedArray.length;
    
    while (leftBound < rightBound) {
      const midPoint = (leftBound + rightBound) >> 1;
      if (sortedArray[midPoint] < targetValue) {
        leftBound = midPoint + 1;
      } else {
        rightBound = midPoint;
      }
    }
    
    return leftBound;
  }
};
