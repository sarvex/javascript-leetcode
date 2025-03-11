/**
 * @param {number[][]} matrix - A binary matrix where 1 represents a filled cell and 0 represents an empty cell
 * @return {number} - The total number of square submatrices with all ones
 *
 * @description
 * This solution uses dynamic programming to count square submatrices with all ones.
 * For each cell (i,j) with value 1, we calculate the largest square that can be formed
 * with that cell as the bottom-right corner by taking the minimum of the values from:
 * - The cell above (i-1,j)
 * - The cell to the left (i,j-1)
 * - The cell diagonally above-left (i-1,j-1)
 *
 * Then we add 1 to get the size of the current square. The sum of all these values
 * gives us the total count of square submatrices.
 *
 * @complexity Time: O(m*n) where m is the number of rows and n is the number of columns
 * @complexity Space: O(1) as we modify the input matrix in-place
 */
const countSquares = (matrix) => {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return 0
  }

  const rows = matrix.length
  const cols = matrix[0].length
  let totalSquares = 0

  for (let col = 0; col < cols; col++) {
    totalSquares += matrix[0][col]
  }

  for (let row = 1; row < rows; row++) {
    totalSquares += matrix[row][0]
  }

  for (let row = 1; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      if (matrix[row][col] === 1) {
        matrix[row][col] = 1 + Math.min(matrix[row - 1][col], matrix[row][col - 1], matrix[row - 1][col - 1])

        totalSquares += matrix[row][col]
      }
    }
  }

  return totalSquares
}
