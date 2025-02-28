/**
 * Sorts each diagonal of a square matrix in ascending order
 * @param {number[][]} grid - The input square matrix
 * @return {number[][]} - The matrix with sorted diagonals
 */
function sortMatrix(grid) {
    const matrixSize = grid.length;
    
    // Sort diagonals starting from the left side (bottom to top)
    for (let startRow = matrixSize - 2; startRow >= 0; --startRow) {
        let [row, col] = [startRow, 0];
        const diagonalElements = [];
        
        // Collect all elements from the current diagonal
        while (row < matrixSize && col < matrixSize) {
            diagonalElements.push(grid[row++][col++]);
        }
        
        // Sort the diagonal elements in ascending order
        diagonalElements.sort((a, b) => a - b);
        
        // Place the sorted elements back into the diagonal
        for (const element of diagonalElements) {
            grid[--row][--col] = element;
        }
    }
    
    // Sort diagonals starting from the right side (bottom to top, excluding the main diagonal)
    for (let startRow = matrixSize - 2; startRow > 0; --startRow) {
        let [row, col] = [startRow, matrixSize - 1];
        const diagonalElements = [];
        
        // Collect all elements from the current diagonal
        while (row >= 0 && col >= 0) {
            diagonalElements.push(grid[row--][col--]);
        }
        
        // Sort the diagonal elements in ascending order
        diagonalElements.sort((a, b) => a - b);
        
        // Place the sorted elements back into the diagonal
        for (const element of diagonalElements) {
            grid[++row][++col] = element;
        }
    }
    
    return grid;
}
