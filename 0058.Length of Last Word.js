/**
 * Trim and Count - Iterate from end to find last word
 * 
 * @intuition
 * The problem requires finding the length of the last word in a string.
 * Starting from the end of the string and working backwards allows us to
 * efficiently find the last word without processing the entire string.
 * 
 * @approach
 * 1. Start from the end of the string and skip any trailing spaces
 * 2. Once we find a non-space character, count characters until we hit a space
 *    or the beginning of the string
 * 3. Return the length of the last word
 * 
 * @complexity
 * Time complexity: O(n) where n is the length of the string
 * Space complexity: O(1) as we only use two pointers
 * 
 * @param {string} s - The input string containing words separated by spaces
 * @return {number} - The length of the last word
 */
const lengthOfLastWord = (s) => {
    let i = s.length - 1;
    
    // Skip trailing spaces
    while (i >= 0 && s[i] === ' ') {
        i--;
    }
    
    // Find the beginning of the last word
    let j = i;
    while (j >= 0 && s[j] !== ' ') {
        j--;
    }
    
    return i - j;
};
