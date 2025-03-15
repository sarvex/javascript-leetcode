/**
 * Finds the maximum number of vowels in any substring of length k.
 * 
 * @intuition
 * Use a sliding window approach to efficiently count vowels in each k-length substring.
 * 
 * @approach
 * 1. Initialize a fixed-size window of length k
 * 2. Count vowels in the first window
 * 3. Slide the window through the string, adding new vowels and removing ones that exit
 * 4. Track the maximum vowel count seen
 * 
 * @complexity
 * Time: O(n) where n is the length of the string
 * Space: O(1) constant space regardless of input size
 * 
 * @param {string} s - The input string
 * @param {number} k - The length of the substring
 * @return {number} - Maximum number of vowels in any substring of length k
 */
const maxVowels = (s, k) => {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  
  // Count vowels in the first window
  let count = 0;
  for (let i = 0; i < k; i++) {
    if (vowels.has(s[i])) {
      count++;
    }
  }
  
  let max = count;
  
  // Slide the window and update vowel count
  for (let i = k; i < s.length; i++) {
    // Add new character, remove character leaving the window
    if (vowels.has(s[i])) {
      count++;
    }
    if (vowels.has(s[i - k])) {
      count--;
    }
    
    max = Math.max(max, count);
  }
  
  return max;
};
