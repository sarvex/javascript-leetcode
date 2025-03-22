/**
 * Greedy Lookup Table Approach
 * 
 * @intuition
 * Roman numerals follow a pattern where certain values have specific representations.
 * By using a lookup table of roman symbols and their corresponding values in descending order,
 * we can greedily subtract the largest possible value at each step.
 * 
 * @approach
 * 1. Create two arrays: one for roman symbols and one for their corresponding values
 * 2. Iterate through the values in descending order
 * 3. For each value, while the input number is greater than or equal to the current value:
 *    - Subtract the value from the input number
 *    - Append the corresponding roman symbol to the result
 * 4. Return the final result string
 * 
 * @complexity
 * Time: O(1) - The algorithm processes a fixed number of roman numeral symbols
 * Space: O(1) - We use constant extra space regardless of input size
 * 
 * @param {number} num - The integer to convert to roman numerals (1 <= num <= 3999)
 * @return {string} - The roman numeral representation of the input integer
 */
const intToRoman = (num) => {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  
  let result = '';
  
  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      result += symbols[i];
      num -= values[i];
    }
  }
  
  return result;
};
