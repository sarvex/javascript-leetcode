/**
 * @param {string[]} words1 - Array of potential universal strings
 * @param {string[]} words2 - Array of strings that must be subsets
 * @return {string[]} - Array of universal strings from words1
 * 
 * A string from words1 is universal if every string in words2 is a subset of it.
 * A string b is a subset of string a if every letter in b occurs in a including multiplicity.
 * 
 * Optimizations:
 * 1. Uses Int8Array for better memory efficiency
 * 2. Tracks total character count to enable early termination
 * 3. Skips words in words1 that are too short to be universal
 * 
 * Time Complexity: O(n * m) where n is the length of words1 and m is the total length of all strings
 * Space Complexity: O(1) as we use fixed-size arrays for character counts (26 lowercase letters)
 */
const wordSubsets = (words1, words2) => {
  // Use Int8Array for better memory efficiency
  const requiredFrequencies = new Int8Array(26);
  const tempFrequencies = new Int8Array(26);
  const result = [];
  
  // Track total character count for early termination optimization
  let totalRequiredChars = 0;
  
  // Calculate the maximum frequency required for each character across all words2
  for (const word of words2) {
    // Reset temporary frequency counter for current word
    tempFrequencies.fill(0);
    
    // Count character frequencies in current word
    for (let i = 0; i < word.length; i++) {
      tempFrequencies[word.charCodeAt(i) - 97]++;
    }
    
    // Update the required frequencies if needed
    for (let i = 0; i < 26; i++) {
      const diff = tempFrequencies[i] - requiredFrequencies[i];
      if (diff > 0) {
        totalRequiredChars += diff;
        requiredFrequencies[i] += diff;
      }
      
      // Early termination: if we need more than 10 characters, no word will be universal
      // This is a heuristic optimization based on problem constraints
      if (totalRequiredChars > 10) {
        return [];
      }
    }
  }
  
  // Check each word in words1 to see if it's universal
  for (let i = 0; i < words1.length; i++) {
    const word = words1[i];
    
    // Skip words that are too short to contain all required characters
    if (word.length < totalRequiredChars) {
      continue;
    }
    
    // Reset temporary frequency counter
    tempFrequencies.fill(0);
    
    // Count character frequencies in current word
    for (let j = 0; j < word.length; j++) {
      tempFrequencies[word.charCodeAt(j) - 97]++;
    }
    
    // Check if this word has all required character frequencies
    let isUniversal = true;
    for (let j = 0; j < 26; j++) {
      if (tempFrequencies[j] < requiredFrequencies[j]) {
        isUniversal = false;
        break;
      }
    }
    
    if (isUniversal) {
      result.push(word);
    }
  }
  
  return result;
};
