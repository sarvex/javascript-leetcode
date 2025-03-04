/**
 * Computes the minimum time required to reach the bottom-right cell in the grid.
 * Returns -1 if the target cell is unreachable.
 *
 * @param {number[][]} grid
 * @return {number}
 */
const minimumTime = (grid) => {
  // Check initial conditions: early exit if first move is not feasible.
  if (Math.min(grid[0][1], grid[1][0]) > 1) {
    return -1
  }

  // Grid dimensions.
  const numRows = grid.length
  const numCols = grid[0].length

  // Min-priority queue to store elements as [time, row, column].
  const priorityQueue = new MinPriorityQueue((node) => node[0])
  priorityQueue.enqueue([0, 0, 0])

  // Set to track visited positions ("row,col").
  const visitedCells = new Set()

  // Four possible movement directions: down, up, right, left.
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]

  // Process cells ordered by earliest time.
  while (!priorityQueue.isEmpty()) {
    const [currentTime, currentRow, currentCol] = priorityQueue.dequeue()

    // Check if the target cell is reached.
    if (currentRow === numRows - 1 && currentCol === numCols - 1) {
      return currentTime
    }

    // Explore neighboring cells.
    for (const [rowOffset, colOffset] of directions) {
      const newRow = currentRow + rowOffset
      const newCol = currentCol + colOffset
      const cellKey = `${newRow},${newCol}`

      // Validate the new cell position.
      if (
        newRow < 0 ||
        newCol < 0 ||
        newRow >= numRows ||
        newCol >= numCols ||
        visitedCells.has(cellKey)
      ) {
        continue
      }

      // Calculate wait time based on parity; ensures proper timing.
      const parityWait = Math.abs(grid[newRow][newCol] - currentTime) % 2 === 0 ? 1 : 0
      // Determine the earliest possible time to visit the new cell.
      const newTime = Math.max(grid[newRow][newCol] + parityWait, currentTime + 1)

      // Enqueue the new cell and mark as visited.
      priorityQueue.enqueue([newTime, newRow, newCol], newTime)
      visitedCells.add(cellKey)
    }
  }

  // If the queue is exhausted, the target is unreachable.
  return -1
}
