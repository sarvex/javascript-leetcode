/**
 * Reverses the vowels in a string while keeping consonants in place
 * @param {string} s - The input string
 * @return {string} - String with vowels reversed
 * 
 * @intuition
 * Use two pointers approach where the left pointer moves continuously forward
 * and the right pointer is adjusted to find vowels from the end.
 * Only swap when left pointer points to a vowel and right pointer has found a vowel.
 * 
 * @approach
 * 1. Create a set of vowels for O(1) lookup
 * 2. Convert string to array for easier manipulation
 * 3. Initialize right pointer at the end of string
 * 4. For each character from left to right:
 *    a. Find the next vowel from the right side
 *    b. If current left character is a vowel, swap with right vowel
 *    c. Move right pointer left after swap
 * 
 * @complexity
 * Time: O(n) where n is the length of the string
 * Space: O(n) for the character array
 */
const reverseVowels = s => {
  const chars = s.split('');
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  let right = chars.length - 1;

  for (let left = 0; left < right; left++) {
    // Find the next vowel from right side
    while (right >= left) {
      if (vowels.has(chars[right])) {
        break;
      }
      right--;
    }
    
    // If left pointer is at a vowel and we haven't crossed pointers
    if (vowels.has(chars[left]) && left < right) {
      // Swap vowels
      [chars[left], chars[right]] = [chars[right], chars[left]];
      right--; // Move right pointer left after swap
    }
  }
  
  return chars.join('');
};
