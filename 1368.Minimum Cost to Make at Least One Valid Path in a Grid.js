/**
 * 1368. Minimum Cost to Make at Least One Valid Path in a Grid
 *
 * Given a grid of size m x n with each cell having a direction (1: right, 2: left, 3: down, 4: up),
 * find the minimum cost to reach the bottom-right cell from the top-left cell.
 * You can change the direction of any cell, but each change costs 1.
 *
 * @param {number[][]} grid - The grid where each cell contains a direction (1-4)
 * @return {number} - Minimum cost to reach the bottom-right cell
 *
 * Approach: 0-1 BFS (Breadth-First Search with 0 and 1 edge weights)
 * - Use a deque (double-ended queue) to efficiently handle 0-cost and 1-cost moves
 * - 0-cost moves are added to the front of the deque (following existing direction)
 * - 1-cost moves are added to the back of the deque (changing direction)
 *
 * Time Complexity: O(m*n) where m is the number of rows and n is the number of columns
 * Space Complexity: O(m*n) for the cost grid and the queues
 */
const minCost = (grid) => {
  const initializeGrid = (rows, cols, fillValue) => {
    const grid = new Array(rows)
    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols).fill(fillValue)
    }
    return grid
  }

  const isValidPosition = (y, x, rows, cols) => {
    return y >= 0 && y < rows && x >= 0 && x < cols
  }

  // Direction vectors [empty, right, left, down, up] to match the grid values 1-4
  const directions = [
    null, // Placeholder to align with 1-indexed direction values
    [0, 1], // Right (direction 1)
    [0, -1], // Left (direction 2)
    [1, 0], // Down (direction 3)
    [-1, 0], // Up (direction 4)
  ]

  const rows = grid.length
  const cols = grid[0].length

  // Initialize cost grid with a value larger than any possible path
  const costGrid = initializeGrid(rows, cols, Infinity)
  costGrid[0][0] = 0 // Starting position has zero cost

  // Initialize deque with two queues for 0-cost and 1-cost moves
  // Format: [y, x] coordinates
  const deque = [[0, 0], []] // [0-cost queue, 1-cost queue]

  let currentCost = 0

  while (true) {
    const currentQueue = deque[0]

    // Process all cells at the current cost level
    for (let i = 0; i < currentQueue.length; i += 2) {
      const y = currentQueue[i]
      const x = currentQueue[i + 1]

      // Check if we've reached the destination
      if (y === rows - 1 && x === cols - 1) {
        return currentCost
      }

      const currentDirection = grid[y][x]

      // Try all four possible directions
      for (let dirIndex = 1; dirIndex <= 4; dirIndex++) {
        const [dy, dx] = directions[dirIndex]
        const newY = y + dy
        const newX = x + dx

        // Cost is 0 if we follow the cell's direction, 1 if we change it
        const moveCost = dirIndex !== currentDirection ? 1 : 0

        // Check if the new position is valid and has a better cost
        if (isValidPosition(newY, newX, rows, cols) && currentCost + moveCost < costGrid[newY][newX]) {
          // Update the cost
          costGrid[newY][newX] = currentCost + moveCost

          // Add to appropriate queue based on move cost
          deque[moveCost].push(newY, newX)
        }
      }
    }

    // Move to next queue
    deque[0] = deque[1]
    deque[1] = []
    currentCost++
  }
}
