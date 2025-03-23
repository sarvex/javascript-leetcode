/**
 * In-place State Tracking
 * 
 * @intuition
 * We need to update all cells simultaneously, but changing values immediately would affect
 * neighboring calculations. To solve this, we can use state markers (2 for cells that will die,
 * -1 for cells that will live) during the first pass, then convert them to final values in a second pass.
 * 
 * @approach
 * 1. Iterate through each cell in the matrix
 * 2. For each cell, count live neighbors (cells with value 1 or 2)
 * 3. Apply Conway's Game of Life rules using temporary states:
 *    - Live cell (1) with <2 or >3 live neighbors becomes 2 (will die)
 *    - Dead cell (0) with exactly 3 live neighbors becomes -1 (will live)
 * 4. In a second pass, convert temporary states to final values:
 *    - 2 → 0 (cell dies)
 *    - -1 → 1 (cell lives)
 * 
 * @complexity
 * Time: O(m*n) where m is the number of rows and n is the number of columns
 * Space: O(1) as we modify the board in-place without extra space
 * 
 * @param {number[][]} board - The game board represented as a matrix
 * @return {void} Do not return anything, modify board in-place instead
 */
const gameOfLife = (board) => {
  const m = board.length;
  const n = board[0].length;
  
  // First pass: determine next states using temporary markers
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      // Count live neighbors (subtract current cell if it's alive)
      let liveNeighbors = -board[i][j];
      
      // Check all 8 neighboring cells
      for (let x = i - 1; x <= i + 1; ++x) {
        for (let y = j - 1; y <= j + 1; ++y) {
          // Count cells that are currently alive (1 or 2)
          if (x >= 0 && x < m && y >= 0 && y < n && board[x][y] > 0) {
            ++liveNeighbors;
          }
        }
      }
      
      // Apply Game of Life rules with state markers
      if (board[i][j] === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
        board[i][j] = 2; // Currently alive but will die
      }
      if (board[i][j] === 0 && liveNeighbors === 3) {
        board[i][j] = -1; // Currently dead but will live
      }
    }
  }
  
  // Second pass: update to final states
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (board[i][j] === 2) {
        board[i][j] = 0; // Convert dying cells to dead
      }
      if (board[i][j] === -1) {
        board[i][j] = 1; // Convert reviving cells to alive
      }
    }
  }
};
