/**
 * Array Indexing - Track character positions for efficient window updates
 * 
 * @intuition
 * Instead of using a Set and manually shrinking the window, we can use an array to track
 * the most recent position of each character. When we encounter a duplicate, we can directly
 * jump the left pointer to the position after the previous occurrence.
 * 
 * @approach
 * 1. Use an array to track the last position of each character (indexed by char code)
 * 2. When we encounter a character that's already in our current window, we directly
 *    jump the left pointer to the position after its last occurrence
 * 3. Update the maximum length after each window adjustment
 * 4. Check the final window length at the end (for cases where the longest substring ends at the string end)
 * 
 * @complexity
 * Time complexity: O(n) where n is the length of the string
 * Space complexity: O(1) as we use a fixed-size array of 128 characters
 * 
 * @param {string} s - The input string
 * @return {number} - Length of the longest substring without repeating characters
 */
const lengthOfLongestSubstring = (s) => {
  let left = 0;
  let maxLength = 0;
  const charPos = Array(128).fill(undefined);
  
  for (let right = 0; right < s.length; right++) {
    const charCode = s.charCodeAt(right);
    
    // If character exists in current window, move left pointer
    if (charPos[charCode] !== undefined && charPos[charCode] >= left) {
      // Update max length before moving the window
      const currentLength = right - left;
      if (currentLength > maxLength) {
        maxLength = currentLength;
      }
      
      // Jump left pointer to position after the previous occurrence
      left = charPos[charCode] + 1;
    }
    
    // Update character position
    charPos[charCode] = right;
  }
  
  // Check if the final window is the longest
  const finalLength = s.length - left;
  return Math.max(maxLength, finalLength);
};
