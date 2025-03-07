/**
 * Minimum obstacles to remove from top-left to bottom-right using zero-one BFS.
 *
 * @param {number[][]} grid
 * @returns {number}
 */
const minimumObstacles = (grid) => {
  const [totalRows, totalColumns] = [grid.length, grid[0].length]
  const [targetRow, targetColumn] = [totalRows - 1, totalColumns - 1]
  const visitedCells = new Uint8Array(totalRows * totalColumns)
  visitedCells[0] = 1
  const directionOffsets = [0, -1, 0, 1, 0]
  let obstacleRemovalCount = 0
  let currentLevelCells = [0]
  let nextLevelCells = []

  while (true) {
    const currentCellIndex = currentLevelCells.pop()
    const currentRow = (currentCellIndex / totalColumns) >> 0
    const currentColumn = currentCellIndex % totalColumns
    for (let i = 0; i < 4; i++) {
      const neighborRow = currentRow + directionOffsets[i],
        neighborColumn = currentColumn + directionOffsets[i + 1]
      if (
        neighborRow < 0 ||
        neighborRow >= totalRows ||
        neighborColumn < 0 ||
        neighborColumn >= totalColumns
      )
        continue
      if (neighborRow === targetRow && neighborColumn === targetColumn) return obstacleRemovalCount
      const neighborIndex = neighborRow * totalColumns + neighborColumn
      if (visitedCells[neighborIndex]) continue
      visitedCells[neighborIndex] = 1
      ;(grid[neighborRow][neighborColumn] === 1 ? nextLevelCells : currentLevelCells).push(
        neighborIndex,
      )
    }
    if (currentLevelCells.length === 0) {
      obstacleRemovalCount++
      ;[currentLevelCells, nextLevelCells] = [nextLevelCells, currentLevelCells]
    }
  }
}
