/**
 * @param {number[][]} grid - Matrix with positive integers
 * @return {number} - Maximum number of moves possible
 * @complexity Time: O(m * n), where m is rows and n is columns
 * @complexity Space: O(m), where m is rows
 */
const maxMoves = (grid) => {
  const rowCount = grid.length
  const colCount = grid[0].length

  let possibleRows = Array.from({ length: rowCount }, (_, index) => index)

  for (let col = 0; col < colCount - 1; ++col) {
    const nextPossibleRows = new Set()

    for (const currentRow of possibleRows) {
      for (let nextRow = currentRow - 1; nextRow <= currentRow + 1; ++nextRow) {
        const isValidMove = nextRow >= 0 && nextRow < rowCount && grid[currentRow][col] < grid[nextRow][col + 1]

        if (isValidMove) {
          nextPossibleRows.add(nextRow)
        }
      }
    }

    if (nextPossibleRows.size === 0) {
      return col
    }

    possibleRows = nextPossibleRows
  }

  return colCount - 1
}
