/**
 * Counts the number of servers that can communicate with at least one other server.
 * Servers can communicate if they are in the same row or column.
 * 
 * @param {number[][]} grid - A grid where 1 represents a server and 0 represents an empty cell
 * @return {number} - The number of servers that can communicate with at least one other server
 */
const countServers = (grid) => {
  const rowCount = grid.length
  const colCount = grid[0].length
  
  // Count servers in each row and column
  const serversInRow = new Array(rowCount).fill(0)
  const serversInCol = new Array(colCount).fill(0)
  
  // First pass: Count servers in each row and column
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      if (grid[row][col] === 1) {
        serversInRow[row]++
        serversInCol[col]++
      }
    }
  }
  
  // Second pass: Count servers that can communicate
  let communicatingServers = 0
  
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      // If this cell has a server and there's at least one other server in the same row or column
      if (grid[row][col] === 1 && (serversInRow[row] > 1 || serversInCol[col] > 1)) {
        communicatingServers++
      }
    }
  }
  
  return communicatingServers
}
