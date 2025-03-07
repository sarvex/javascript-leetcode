/**
 * @param {number[][]} matrix - The input matrix consisting of 0s and 1s
 * @return {number} - Maximum number of rows that can have all values equal after some flips
 *
 * Time Complexity: O(m*n) where m is the number of rows and n is the number of columns
 * Space Complexity: O(m) for storing the patterns
 */
const maxEqualRowsAfterFlips = (matrix) => {
  const rowPatternCounts = new Map()
  let maxRowCount = 0

  for (const row of matrix) {
    const needsNormalization = row[0] === 1
    const normalizedRow = row.map((value) => (needsNormalization ? value ^ 1 : value)).join('')

    const rowCount = (rowPatternCounts.get(normalizedRow) || 0) + 1
    rowPatternCounts.set(normalizedRow, rowCount)
    maxRowCount = Math.max(maxRowCount, rowCount)
  }

  return maxRowCount
}
