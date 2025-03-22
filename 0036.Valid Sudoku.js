/**
 * Set-based Validation - Efficiently validates a Sudoku board using a single Set with unique identifiers
 * 
 * @intuition
 * To validate a Sudoku board, we need to check three constraints simultaneously: no duplicates in rows, columns, 
 * or 3x3 sub-boxes. We can use a single Set with unique identifiers for each position to validate all constraints 
 * in a single pass.
 * 
 * @approach
 * 1. Use a single Set to track seen digits with their position context
 * 2. For each cell with a digit, add three entries to the Set:
 *    - "row-i-digit" to track digits in row i
 *    - "col-j-digit" to track digits in column j
 *    - "box-boxIndex-digit" to track digits in 3x3 box
 * 3. If any of these entries already exist in the Set, return false
 * 4. If we complete the iteration without finding duplicates, return true
 * 
 * @complexity
 * Time complexity: O(1) - We always process a 9x9 board with a constant number of operations
 * Space complexity: O(1) - We use a fixed amount of extra space regardless of input
 * 
 * @param {character[][]} board - 9x9 Sudoku board with digits 1-9 or '.'
 * @return {boolean} - True if the board is valid, false otherwise
 */
const isValidSudoku = (board) => {
  const seen = new Set();
  
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = board[i][j];
      
      if (cell === '.') continue;
      
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      const rowKey = `row-${i}-${cell}`;
      const colKey = `col-${j}-${cell}`;
      const boxKey = `box-${boxIndex}-${cell}`;
      
      if (seen.has(rowKey) || seen.has(colKey) || seen.has(boxKey)) {
        return false;
      }
      
      seen.add(rowKey);
      seen.add(colKey);
      seen.add(boxKey);
    }
  }
  
  return true;
};
