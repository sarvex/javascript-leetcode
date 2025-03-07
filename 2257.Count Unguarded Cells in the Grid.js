/**
 * @param {number} m - Number of rows in the grid
 * @param {number} n - Number of columns in the grid
 * @param {number[][]} guards - Positions of guards, each position as [row, col]
 * @param {number[][]} walls - Positions of walls, each position as [row, col]
 * @return {number} - Number of cells that are not guarded
 */
const countUnguarded = (m, n, guards, walls) => {
  const grid = new Array(m * n).fill(0)
  const [EMPTY, GUARD, WALL, GUARDED] = [0, 1, 2, 3]

  for (const [row, col] of guards) {
    grid[col + row * n] = GUARD
  }

  for (const [row, col] of walls) {
    grid[col + row * n] = WALL
  }

  const markCellIfGuardable = (cellIndex) => {
    if (grid[cellIndex] === WALL || grid[cellIndex] === GUARD) {
      return true
    }

    grid[cellIndex] = GUARDED
    return false
  }

  for (const [guardRow, guardCol] of guards) {
    for (let row = guardRow - 1; row >= 0; row--) {
      if (markCellIfGuardable(guardCol + row * n)) break
    }

    for (let row = guardRow + 1; row < m; row++) {
      if (markCellIfGuardable(guardCol + row * n)) break
    }

    for (let col = guardCol - 1; col >= 0; col--) {
      if (markCellIfGuardable(guardRow * n + col)) break
    }

    for (let col = guardCol + 1; col < n; col++) {
      if (markCellIfGuardable(guardRow * n + col)) break
    }
  }

  return grid.filter((cellState) => cellState === EMPTY).length
}
