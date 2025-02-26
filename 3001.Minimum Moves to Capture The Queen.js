/**
 * @param {number} a - Row of white rook (1-indexed)
 * @param {number} b - Column of white rook (1-indexed)
 * @param {number} c - Row of white bishop (1-indexed)
 * @param {number} d - Column of white bishop (1-indexed)
 * @param {number} e - Row of black queen (1-indexed)
 * @param {number} f - Column of black queen (1-indexed)
 * @return {number} - Minimum number of moves to capture the queen
 */
const minMovesToCaptureTheQueen = (a, b, c, d, e, f) => {
  // Check if rook can capture queen in one move (same row or column)
  if (a === e || b === f) {
    // Check if bishop blocks the rook's path to the queen
    if (a === e && c === e && ((b < d && d < f) || (f < d && d < b))) {
      // Bishop is between rook and queen on the same row
      return 2
    }
    if (b === f && d === f && ((a < c && c < e) || (e < c && c < a))) {
      // Bishop is between rook and queen on the same column
      return 2
    }
    // Rook can capture queen in one move
    return 1
  }

  // Check if bishop can capture queen in one move (same diagonal)
  if (Math.abs(c - e) === Math.abs(d - f)) {
    // Check if rook blocks the bishop's path to the queen
    const rowDiff = e > c ? 1 : -1
    const colDiff = f > d ? 1 : -1
    let row = c + rowDiff
    let col = d + colDiff

    while (row !== e && col !== f) {
      if (row === a && col === b) {
        // Rook is blocking the bishop's path
        return 2
      }
      row += rowDiff
      col += colDiff
    }

    // Bishop can capture queen in one move
    return 1
  }

  // If neither piece can capture in one move, we need 2 moves
  return 2
}
