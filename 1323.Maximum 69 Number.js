/**
 * String Conversion - Convert to string, replace first 6 with 9, convert back to number
 *
 * @intuition The maximum value will be achieved by changing the leftmost 6 to 9
 *
 * @approach Convert the number to string, replace the first occurrence of '6' with '9',
 * then convert back to number. This is optimal since replacing any 6 with 9 increases
 * the value, and replacing the leftmost 6 gives the maximum increase due to place value.
 *
 * @complexity
 * Time: O(log n) where n is the input number (for string conversion and scanning)
 * Space: O(log n) for the string representation
 *
 * @param {number} num - A positive integer
 * @return {number} - The maximum number after changing at most one digit from 6 to 9
 */
const maximum69Number = (num) => Number(String(num).replace('6', '9'));
