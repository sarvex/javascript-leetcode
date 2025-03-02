/**
 * First Completely Painted Row or Column
 *
 * @param {number[]} arr - Array representing the order in which cells are painted
 * @param {number[][]} mat - Matrix where each cell contains a unique integer from 1 to m*n
 * @return {number} - The index in arr when the first row or column is completely painted
 * 
 * Approach:
 * 1. Precompute the row and column position of each number in the matrix
 * 2. Track the remaining unpainted cells in each row and column
 * 3. For each number in arr, decrement the count for its row and column
 * 4. Return the index when any row or column count reaches zero
 * 
 * Time Complexity: O(m*n) where m is the number of rows and n is the number of columns
 * Space Complexity: O(m*n) for storing positions and counters
 */
const firstCompleteIndex = (arr, mat) => {
  const rows = mat.length;
  const cols = mat[0].length;
  
  // Arrays to store the row and column position of each number in the matrix
  const numberToRowPosition = new Uint32Array(rows * cols + 1);
  const numberToColPosition = new Uint32Array(rows * cols + 1);
  
  // Counters for unpainted cells in each row and column
  const unpaintedCellsInRow = new Uint32Array(rows);
  const unpaintedCellsInCol = new Uint32Array(cols);
  
  // Initialize counters - each row has n cells, each column has m cells
  unpaintedCellsInRow.fill(cols, 0, rows);
  unpaintedCellsInCol.fill(rows, 0, cols);
  
  // Precompute the position of each number in the matrix
  for (let row = 0; row < rows; ++row) {
    for (let col = 0; col < cols; ++col) {
      const number = mat[row][col];
      numberToRowPosition[number] = row;
      numberToColPosition[number] = col;
    }
  }
  
  // Process numbers in the given order
  for (let index = 0; index < arr.length; ++index) {
    const currentNumber = arr[index];
    const row = numberToRowPosition[currentNumber];
    const col = numberToColPosition[currentNumber];
    
    // Decrement unpainted cell counts for the current row and column
    unpaintedCellsInRow[row]--;
    unpaintedCellsInCol[col]--;
    
    // Check if any row or column is completely painted
    if (unpaintedCellsInRow[row] === 0 || unpaintedCellsInCol[col] === 0) {
      return index;
    }
  }
  
  // This should never be reached as the problem guarantees a solution
  return -1;
};
