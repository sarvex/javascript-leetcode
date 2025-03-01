/**
 * Finds the maximum number of fish that can be caught by starting at any water cell
 * and repeatedly traveling to adjacent water cells.
 *
 * Uses an iterative BFS approach with a queue instead of recursion to avoid stack overflow
 * for large connected components.
 *
 * @param {number[][]} grid - Grid where positive values represent fish count, 0 represents land
 * @return {number} - Maximum number of fish that can be caught from any starting point
 */
const findMaxFish = (grid) => {
  const rowCount = grid.length
  const colCount = grid[0].length

  // Direction vectors for 4-directional movement (up, right, down, left)
  const directions = [
    [-1, 0], // up
    [0, 1],  // right
    [1, 0],  // down
    [0, -1]  // left
  ]

  /**
   * Performs breadth-first search from a starting cell to find connected water cells
   * @param {number} startRow - Starting row
   * @param {number} startCol - Starting column
   * @return {number} - Total fish count in the connected component
   */
  const search = (startRow, startCol) => {
    // Use a queue for BFS instead of recursion
    const queue = [[startRow, startCol]]
    let totalFish = grid[startRow][startCol]

    // Mark the starting cell as visited
    grid[startRow][startCol] = 0

    // Process cells in queue until empty
    while (queue.length > 0) {
      const [row, col] = queue.shift()

      // Check all four adjacent cells
      for (const [rowOffset, colOffset] of directions) {
        const nextRow = row + rowOffset
        const nextCol = col + colOffset

        // Check if the adjacent cell is valid and contains fish
        const isValidCell =
          nextRow >= 0 &&
          nextRow < rowCount &&
          nextCol >= 0 &&
          nextCol < colCount

        if (isValidCell && grid[nextRow][nextCol] > 0) {
          // Add fish count to total
          totalFish += grid[nextRow][nextCol]

          // Mark as visited
          grid[nextRow][nextCol] = 0

          // Add to queue for further exploration
          queue.push([nextRow, nextCol])
        }
      }
    }

    return totalFish
  }

  let maxFishCount = 0

  // Iterate through all cells in the grid
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      // If cell contains fish, start BFS from this cell
      if (grid[row][col] > 0) {
        const connectedFishCount = search(row, col)
        maxFishCount = Math.max(maxFishCount, connectedFishCount)
      }
    }
  }

  return maxFishCount
}
