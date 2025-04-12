/**
 * Counts N-Queens solutions using backtracking with optimized bitmasking.
 *
 * @intuition
 * The core idea remains placing queens row by row using backtracking. To speed up conflict detection (checking columns and diagonals), we can represent the board state using integers (bitmasks). Each bit in these masks corresponds to a column or diagonal, allowing us to quickly check if a position is under attack using fast bitwise operations instead of slower array lookups.
 *
 * @approach
 * This solution uses a recursive backtracking strategy combined with bitmasking for optimization. Three integer masks track the occupied columns, main diagonals, and anti-diagonals. The recursive function explores placing a queen in each safe column of the current row. Safety checks and state updates are performed efficiently using bitwise operations on these masks. When a full placement (N queens) is achieved, the solution count is incremented.
 *
 * @complexity
 * Time: O(N!). Although the complexity class remains the same, bitmasking significantly reduces the constant factor compared to the array-based approach, making it much faster in practice.
 * Space: O(N) due to the recursion stack depth. The masks use constant space (O(1)).
 *
 * @param {number} n The size of the chessboard and the number of queens.
 * @returns {number} The total number of distinct solutions.
 */
const totalNQueens = (n) => {
  let solutionCount = 0
  const allColumnsMask = (1 << n) - 1 // Mask representing all columns 0 to n-1

  const backtrack = (row, columnMask, diag1Mask, diag2Mask) => {
    if (row === n) {
      solutionCount++
      return
    }

    let availablePositions = allColumnsMask & ~(columnMask | diag1Mask | diag2Mask)

    while (availablePositions > 0) {
      // Get the position of the rightmost available column (least significant bit)
      const position = availablePositions & -availablePositions

      // Place the queen and recurse
      backtrack(row + 1, columnMask | position, (diag1Mask | position) << 1, (diag2Mask | position) >> 1)

      // Remove the processed position to find the next available column
      availablePositions &= availablePositions - 1 // or availablePositions ^= position;
    }
  }

  backtrack(0, 0, 0, 0)
  return solutionCount
}
