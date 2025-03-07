/**
 * @param {character[][]} boxGrid - The m x n matrix representing a side-view of a box
 * @return {character[][]} - The n x m matrix representing the box after rotation and gravity
 *
 * @description
 * This solution handles the rotation of a box and the subsequent falling of stones due to gravity.
 * Time Complexity: O(m * n) where m is the number of rows and n is the number of columns
 * Space Complexity: O(m * n) for the result matrix
 */
const rotateTheBox = (boxGrid) => {
  const m = boxGrid.length
  const n = boxGrid[0].length

  const result = Array(n)
    .fill()
    .map(() => Array(m).fill('.'))

  for (let row = 0; row < m; row++) {
    let fallingPosition = n - 1

    for (let col = n - 1; col >= 0; col--) {
      const currentCell = boxGrid[row][col]

      if (currentCell === '.') continue

      if (currentCell === '*') {
        result[col][m - 1 - row] = '*'
        fallingPosition = col - 1
      } else if (currentCell === '#') {
        result[fallingPosition][m - 1 - row] = '#'
        fallingPosition--
      }
    }
  }

  return result
}
