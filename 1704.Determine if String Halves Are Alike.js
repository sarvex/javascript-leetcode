/**
 * @param {string} s - Input string of even length
 * @return {boolean} - Whether both halves of the string contain the same number of vowels
 * 
 * Solution approach:
 * 1. Define a set of vowels (both uppercase and lowercase)
 * 2. Split the string into two halves
 * 3. Count vowels in both halves simultaneously using a single counter
 *    - Increment for vowels in the first half
 *    - Decrement for vowels in the second half
 * 4. If the counter is zero at the end, both halves have the same number of vowels
 * 
 * Time Complexity: O(n) where n is the length of the input string
 * Space Complexity: O(1) - constant space for the vowels set
 */
const halvesAreAlike = (s) => {
    // Set of vowels (both uppercase and lowercase)
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    
    // Counter for vowel difference between halves
    let vowelCounter = 0;
    
    // Calculate the midpoint of the string
    const midpoint = s.length >> 1;
    
    // Process both halves simultaneously
    for (let i = 0; i < midpoint; ++i) {
        // Increment for vowels in first half
        if (vowels.has(s[i])) {
            vowelCounter++;
        }
        
        // Decrement for vowels in second half
        if (vowels.has(s[midpoint + i])) {
            vowelCounter--;
        }
    }
    
    // If counter is zero, both halves have the same number of vowels
    return vowelCounter === 0;
};
