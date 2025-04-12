/**
 * Solves the N-Queens problem using backtracking with a 1D array representation.
 * @intuition
 * The N-Queens problem asks for placing N non-attacking queens on an N×N chessboard.
 * Backtracking is a suitable approach: explore potential queen placements row by row.
 * If a placement leads to a conflict, abandon that path and try the next option.
 * Instead of maintaining a full 2D board, we can represent the placement using a
 * 1D array where the index is the row and the value is the column of the queen.
 * @approach
 * We use a backtracking strategy, representing the board implicitly with a 1D array `queenPlacement`,
 * where `queenPlacement[row] = col` indicates a queen is at `(row, col)`.
 * The `backtrack` function attempts to place a queen in the current `row`.
 * It iterates through each `col` from 0 to `n-1`.
 * For each potential placement `(row, col)`, we check if it conflicts with any previously placed queens.
 * This conflict check involves iterating from `prevRow = 0` to `row - 1`:
 *   - Get the column of the previously placed queen: `prevCol = queenPlacement[prevRow]`.
 *   - Check for same column conflict: `col === prevCol`.
 *   - Check for diagonal conflict: `Math.abs(row - prevRow) === Math.abs(col - prevCol)`.
 * If the placement `(row, col)` is valid (no conflicts), we add the column `col` to our
 * `queenPlacement` array (conceptually, `queenPlacement[row] = col`) and recursively call `backtrack` for the next row (`row + 1`).
 * If the recursive call returns, we backtrack by removing the last placement (e.g., popping from the array).
 * The base case for the recursion is when `row === n`, meaning we have successfully placed N queens.
 * At this point, we format the `queenPlacement` array into the required `string[][]` board representation
 * (each element like ".Q..") and add it to the `solutions` list.
 * The process is initiated by calling the backtrack function for the first row (row 0) with an empty placement array.
 * @complexity
 * Time: O(N!). Although the conflict check within each step is O(N) instead of O(1), the overall complexity is still dominated by the factorial nature of exploring valid N-Queen placements.
 * Space: O(N) for the recursion stack and the `queenPlacement` array. Storing the solutions requires O(N^2 * S) where S is the number of solutions. Overall space complexity is typically dominated by the solution storage if S is large, otherwise O(N).
 * @param {number} n The size of the chessboard and the number of queens.
 * @returns {string[][]} A list of all distinct solutions to the N-Queens puzzle.
 */
const solveNQueens = (n) => {
  const solutions = [];

  // Helper function to format the 1D placement array into a 2D board solution
  const formatSolution = (placement) => {
    const board = [];
    for (let col of placement) {
      let rowStr = '.'.repeat(col) + 'Q' + '.'.repeat(n - col - 1);
      board.push(rowStr);
    }
    solutions.push(board);
  };

  const backtrack = (row, currentPlacement) => {
    if (row === n) {
      formatSolution(currentPlacement);
      return;
    }

    for (let col = 0; col < n; ++col) {
      let isValid = true;
      // Check conflicts with previously placed queens
      for (let prevRow = 0; prevRow < row; ++prevRow) {
        const prevCol = currentPlacement[prevRow];
        // Column conflict
        if (col === prevCol) {
          isValid = false;
          break;
        }
        // Diagonal conflict
        if (Math.abs(row - prevRow) === Math.abs(col - prevCol)) {
          isValid = false;
          break;
        }
      }

      if (isValid) {
        currentPlacement.push(col); // Place queen (add column to placement array)
        backtrack(row + 1, currentPlacement);
        currentPlacement.pop(); // Backtrack (remove queen)
      }
    }
  };

  // Start backtracking from the first row with an empty placement
  backtrack(0, []);

  return solutions;
};
