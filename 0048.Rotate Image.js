/**
 * Matrix Transpose and Reverse Approach
 * 
 * @intuition
 * When rotating a matrix 90° clockwise, we can break it down into two operations:
 * 1. Reverse the rows (top to bottom becomes bottom to top)
 * 2. Transpose the matrix (swap elements across the main diagonal)
 * This approach is elegant as it avoids complex index calculations.
 * 
 * @approach
 * 1. Reverse the rows of the matrix (using the built-in reverse method)
 * 2. Transpose the matrix by swapping elements across the main diagonal
 *    - Only need to iterate through the lower triangular portion to avoid double swapping
 * 
 * @complexity
 * Time: O(n²) where n is the side length of the matrix
 * Space: O(1) as we modify the matrix in-place
 * 
 * @param {number[][]} matrix - n x n 2D matrix
 * @return {void} Do not return anything, modify matrix in-place instead
 */
const rotate = (matrix) => {
  matrix.reverse();
  
  for (let i = 0; i < matrix.length; ++i) {
    for (let j = 0; j < i; ++j) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
};
