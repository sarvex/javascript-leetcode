/**
 * O(1) space optimization using first row and column as markers
 *
 * @intuition
 * Instead of using additional arrays to track which rows and columns need to be zeroed,
 * we can use the first row and first column of the matrix itself as markers.
 * We need special flags for the first row and column since they're being used as markers.
 *
 * @approach
 * 1. Use two variables to track if the first row and first column need to be zeroed
 * 2. Use the first row and column cells as markers for other rows and columns
 * 3. Process the matrix (except first row and column) based on these markers
 * 4. Finally, zero out the first row and column if needed
 *
 * @complexity
 * Time: O(m*n) where m is the number of rows and n is the number of columns
 * Space: O(1) as we use the matrix itself for marking
 *
 * @param {number[][]} matrix - The input matrix to be modified in-place
 * @return {void} Do not return anything, modify matrix in-place instead
 */
const setZeroes = (matrix) => {
  const m = matrix.length;
  const n = matrix[0].length;

  // Check if first row and column contain zeros
  const checkFirstRowAndColumn = () => {
    let firstRowHasZero = false;
    let firstColHasZero = false;

    // Check first row
    for (let j = 0; j < n; j++) {
      if (matrix[0][j] === 0) {
        firstRowHasZero = true;
        break;
      }
    }

    // Check first column
    for (let i = 0; i < m; i++) {
      if (matrix[i][0] === 0) {
        firstColHasZero = true;
        break;
      }
    }

    return { firstRowHasZero, firstColHasZero };
  };

  // Mark zeros in the first row and column as indicators
  const markZeroIndicators = () => {
    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        if (matrix[i][j] === 0) {
          matrix[i][0] = 0;
          matrix[0][j] = 0;
        }
      }
    }
  };

  // Process the matrix using the indicators to set zeros
  const processMatrix = () => {
    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        if (matrix[i][0] === 0 || matrix[0][j] === 0) {
          matrix[i][j] = 0;
        }
      }
    }
  };

  // Set the first row to all zeros
  const setFirstRowZero = () => {
    for (let j = 0; j < n; j++) {
      matrix[0][j] = 0;
    }
  };

  // Set the first column to all zeros
  const setFirstColumnZero = () => {
    for (let i = 0; i < m; i++) {
      matrix[i][0] = 0;
    }
  };

  const { firstRowHasZero, firstColHasZero } = checkFirstRowAndColumn();
  markZeroIndicators();
  processMatrix();

  if (firstRowHasZero) setFirstRowZero();
  if (firstColHasZero) setFirstColumnZero();
};
