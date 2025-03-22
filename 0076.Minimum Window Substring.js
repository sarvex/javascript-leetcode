/**
 * Sliding Window with Optimized Character Counting
 * 
 * @intuition
 * The problem requires finding the minimum window in string s that contains all characters from string t.
 * A sliding window with a single character frequency array efficiently tracks valid windows.
 * 
 * @approach
 * 1. Create a frequency array for characters in t (positive counts indicate needed characters)
 * 2. Use two pointers (left and right) to maintain a sliding window
 * 3. Decrement counts when adding characters to window (right pointer)
 * 4. Increment counts when removing characters from window (left pointer)
 * 5. Track matched character count to determine when all required characters are found
 * 6. Minimize window size when all characters are matched
 * 
 * @complexity
 * Time: O(m + n) where m is length of s and n is length of t
 * Space: O(1) as we use fixed-size array of length 256 (ASCII)
 * 
 * @param {string} s - The source string to search in
 * @param {string} t - The target string containing characters to be included
 * @return {string} - Minimum window substring containing all characters from t
 */
const minWindow = (s, t) => {
  // Initialize character frequency array
  const charFreq = Array(256).fill(0);
  
  // Count frequency of each character in t
  for (const char of t) {
    charFreq[char.charCodeAt(0)]++;
  }
  
  let matchCount = 0;
  let left = 0;
  let startIndex = -1;
  let minLength = Infinity;
  
  // Sliding window implementation
  for (let right = 0; right < s.length; right++) {
    // Process current character at right pointer
    const rightChar = s.charCodeAt(right);
    
    // If this character is needed (positive count in charFreq)
    if (charFreq[rightChar] > 0) {
      matchCount++;
    }
    
    // Decrement frequency count (may go negative for characters not in t)
    charFreq[rightChar]--;
    
    // When all characters from t are found, try to minimize the window
    while (matchCount === t.length) {
      // Update minimum window if current is smaller
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        startIndex = left;
      }
      
      // Process character at left pointer
      const leftChar = s.charCodeAt(left);
      
      // Increment frequency count
      charFreq[leftChar]++;
      
      // If removing this character affects our required characters
      if (charFreq[leftChar] > 0) {
        matchCount--;
      }
      
      // Move left pointer to contract window
      left++;
    }
  }
  
  return startIndex === -1 ? '' : s.slice(startIndex, startIndex + minLength);
};
