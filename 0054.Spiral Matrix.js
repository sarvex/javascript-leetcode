/**
 * Spiral Traversal - Directional movement with visited tracking
 * 
 * @intuition
 * We can traverse the matrix in a spiral order by moving in four directions:
 * right, down, left, up. We keep track of visited cells to know when to change direction.
 * 
 * @approach
 * 1. Initialize a visited matrix to track cells we've already processed
 * 2. Define direction vectors for right, down, left, up movement using a single array
 * 3. Traverse the matrix, changing direction when we hit a boundary or visited cell
 * 4. Continue until we've visited all cells
 * 
 * @complexity
 * Time complexity: O(m*n) where m is the number of rows and n is the number of columns
 * Space complexity: O(m*n) for the visited matrix and result array
 * 
 * @param {number[][]} matrix - The input matrix
 * @return {number[]} - Elements in spiral order
 */
const spiralOrder = (matrix) => {
  const m = matrix.length;
  const n = matrix[0].length;
  const result = [];
  const visited = Array.from({ length: m }, () => Array(n).fill(false));
  
  // Direction vectors [right, down, left, up] represented as [dx, dy] pairs
  const dirs = [0, 1, 0, -1, 0];
  
  let row = 0;
  let col = 0;
  let dirIndex = 0;
  
  // Traverse all m*n elements
  for (let remaining = m * n; remaining > 0; remaining--) {
    // Add current element to result
    result.push(matrix[row][col]);
    visited[row][col] = true;
    
    // Calculate next position
    const nextRow = row + dirs[dirIndex];
    const nextCol = col + dirs[dirIndex + 1];
    
    // Check if we need to change direction
    if (
      nextRow < 0 || 
      nextRow >= m || 
      nextCol < 0 || 
      nextCol >= n || 
      visited[nextRow][nextCol]
    ) {
      // Change direction (cycle through 0-3)
      dirIndex = (dirIndex + 1) % 4;
    }
    
    // Move to next position
    row += dirs[dirIndex];
    col += dirs[dirIndex + 1];
  }
  
  return result;
};
