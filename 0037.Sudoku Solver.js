/**
 * Bit manipulation with minimum remaining values heuristic
 * @intuition Use bit manipulation to track constraints and prioritize cells with fewest options
 * @approach Use bitwise operations to efficiently track used digits in rows, columns, and boxes
 * @complexity Time O(9^m) where m is the number of empty cells, Space O(1) as we only use fixed-size arrays
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const solveSudoku = (board) => {
  if (!board || board.length !== 9 || board[0].length !== 9) return

  let remainingCells = 0
  const rows = Array(9).fill(0)
  const cols = Array(9).fill(0)
  const boxes = Array(9).fill(0)

  // Initialize constraints using bit manipulation
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== '.') {
        const boxIndex = 3 * Math.floor(r / 3) + Math.floor(c / 3)
        const digit = parseInt(board[r][c]) - 1
        rows[r] |= 1 << digit
        cols[c] |= 1 << digit
        boxes[boxIndex] |= 1 << digit
      } else {
        remainingCells++
      }
    }
  }

  const findCellWithMinOptions = () => {
    let minRow = -1
    let minCol = -1
    let minOptions = Infinity

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === '.') {
          const boxIndex = 3 * Math.floor(r / 3) + Math.floor(c / 3)
          const usedDigits = rows[r] | cols[c] | boxes[boxIndex]
          let availableOptions = 0

          for (let digit = 0; digit < 9; digit++) {
            if (((usedDigits >> digit) & 1) === 0) {
              availableOptions++
            }
          }

          if (availableOptions < minOptions) {
            minOptions = availableOptions
            minRow = r
            minCol = c
          }
        }
      }
    }

    return [minRow, minCol]
  }

  const solve = (remaining) => {
    if (remaining === 0) return true

    const [r, c] = findCellWithMinOptions()
    const boxIndex = 3 * Math.floor(r / 3) + Math.floor(c / 3)
    const usedDigits = rows[r] | cols[c] | boxes[boxIndex]

    // Save original states for backtracking
    const originalRow = rows[r]
    const originalCol = cols[c]
    const originalBox = boxes[boxIndex]

    for (let digit = 0; digit < 9; digit++) {
      if (((usedDigits >> digit) & 1) === 0) {
        // This digit is not used in the current row, column, or box
        board[r][c] = (digit + 1).toString()
        rows[r] |= 1 << digit
        cols[c] |= 1 << digit
        boxes[boxIndex] |= 1 << digit

        if (solve(remaining - 1)) return true

        // Backtrack
        board[r][c] = '.'
        rows[r] = originalRow
        cols[c] = originalCol
        boxes[boxIndex] = originalBox
      }
    }

    return false
  }

  solve(remainingCells)
}
