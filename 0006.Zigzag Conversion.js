/**
 * Zigzag Pattern Traversal with String Optimization
 * 
 * @intuition
 * The zigzag pattern can be simulated by moving in a zigzag direction through the string.
 * We can use a direction flag to change direction when we hit the top or bottom row.
 * 
 * @approach
 * 1. Create an array of strings (not arrays) to store characters in each row
 * 2. Traverse the string, appending each character to its corresponding row string
 * 3. Change direction when reaching the first or last row
 * 4. Join all row strings to form the final result
 * 
 * @complexity
 * Time: O(n) where n is the length of the input string
 * Space: O(n) to store all characters in the rows array
 * 
 * @param {string} s - The input string to be converted
 * @param {number} numRows - Number of rows in zigzag pattern
 * @return {string} - The zigzag converted string
 */
const convert = (s, numRows) => {
  // Handle edge cases
  if (numRows === 1 || numRows >= s.length) return s;
  
  // Initialize rows array with empty strings
  const rows = Array.from({ length: numRows }, () => '');
  
  // Variables to track current row and direction
  let row = 0;
  let direction = 1;
  
  // Place each character in the appropriate row
  for (const char of s) {
    rows[row] += char; // Append directly to string
    
    // Change direction at boundary rows
    if (row === 0) direction = 1;
    else if (row === numRows - 1) direction = -1;
    
    row += direction;
  }
  
  // Combine all rows into the final string
  return rows.join('');
};
