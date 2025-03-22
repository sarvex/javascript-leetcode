/**
 * Preprocessing approach with string manipulation
 * 
 * @intuition
 * Clean the string first by removing all non-alphanumeric characters and converting to lowercase,
 * then compare with its reverse to check if it's a palindrome.
 * 
 * @approach
 * 1. Convert the string to lowercase
 * 2. Remove all non-alphanumeric characters using regex
 * 3. Create a reversed version of the cleaned string
 * 4. Compare the cleaned string with its reverse
 * 
 * @complexity
 * Time complexity: O(n) where n is the length of the string
 * Space complexity: O(n) as we create new strings for the cleaned and reversed versions
 * 
 * @param {string} s - The input string to check
 * @return {boolean} - True if the string is a valid palindrome, false otherwise
 */
const isPalindrome = (s) => {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = cleaned.split('').reverse().join('');
  
  return cleaned === reversed;
};
