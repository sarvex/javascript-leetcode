/**
 * Sliding Window with Hash Map
 * 
 * @intuition
 * We can use a sliding window approach with hash maps to track word frequencies.
 * Since all words have the same length, we can check each possible starting position
 * and slide through the string in increments of word length.
 * 
 * @approach
 * 1. Create a map to store frequency of each word in the input array
 * 2. For each possible starting position (0 to wordLength-1):
 *    a. Use two pointers (left, right) to maintain a sliding window
 *    b. Track word frequencies in the current window with another map
 *    c. When a word not in our target list is encountered, reset the window
 *    d. When a word appears more times than needed, shrink the window from left
 *    e. When window size equals total length of all words, add left pointer to result
 * 
 * @complexity
 * Time: O(n * m), where n is the length of string s and m is the total length of all words
 * Space: O(k), where k is the number of unique words in the words array
 * 
 * @param {string} s - The input string to search in
 * @param {string[]} words - Array of words to find concatenated substrings
 * @return {number[]} - Starting indices of all concatenated substrings
 */
const findSubstring = (s, words) => {
  // Handle edge cases
  if (!s?.length || !words?.length) return [];
  
  const wordFreq = new Map();
  
  // Build frequency map of target words
  words.forEach(word => wordFreq.set(word, (wordFreq.get(word) || 0) + 1));
  
  const result = [];
  const [strLength, wordCount, wordLength] = [s.length, words.length, words[0].length];
  const totalLength = wordCount * wordLength;
  
  // Helper function to shrink window from left
  const shrinkWindowFromLeft = (left, excessWord, currentFreq) => {
    while (currentFreq.get(excessWord) > wordFreq.get(excessWord)) {
      const leftWord = s.substring(left, left + wordLength);
      const newCount = currentFreq.get(leftWord) - 1;
      
      newCount ? currentFreq.set(leftWord, newCount) : currentFreq.delete(leftWord);
      left += wordLength;
    }
    return left;
  };
  
  // Helper function to process each window
  const processWindow = startPos => {
    let left = startPos;
    let right = startPos;
    const currentFreq = new Map();
    
    while (right + wordLength <= strLength) {
      const currentWord = s.substring(right, right + wordLength);
      right += wordLength;
      
      // If word not in our target list, reset the window
      if (!wordFreq.has(currentWord)) {
        currentFreq.clear();
        left = right;
        continue;
      }
      
      // Add current word to frequency map
      currentFreq.set(currentWord, (currentFreq.get(currentWord) || 0) + 1);
      
      // Shrink window from left if needed
      if (currentFreq.get(currentWord) > wordFreq.get(currentWord)) {
        left = shrinkWindowFromLeft(left, currentWord, currentFreq);
      }
      
      // If window size equals total length of all words, we found a match
      if (right - left === totalLength) {
        result.push(left);
      }
    }
  };
  
  // Try each possible starting position
  for (let i = 0; i < wordLength; i++) {
    processWindow(i);
  }
  
  return result;
};
