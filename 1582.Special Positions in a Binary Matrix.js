/**
 * @param {number[][]} mat - Binary matrix (contains only 0s and 1s)
 * @return {number} - Count of special positions in the matrix
 * 
 * Solution approach:
 * A position is special if it contains a 1 and is the only 1 in its row and column.
 * 
 * 1. Count the number of 1s in each row and column
 * 2. Iterate through the matrix to find positions where:
 *    - The value is 1
 *    - The row contains exactly one 1
 *    - The column contains exactly one 1
 * 
 * Time Complexity: O(m*n) where m is the number of rows and n is the number of columns
 * Space Complexity: O(m+n) for storing row and column counts
 */
const numSpecial = (mat) => {
    // Get matrix dimensions
    const rows = mat.length;
    const cols = mat[0].length;
    
    // Arrays to store the count of 1s in each row and column
    const rowCounts = Array(rows).fill(0);
    const colCounts = Array(cols).fill(0);
    
    // Count 1s in each row and column
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            rowCounts[i] += mat[i][j];
            colCounts[j] += mat[i][j];
        }
    }
    
    // Count special positions
    let specialPositions = 0;
    
    // Check each cell to see if it's special
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            // A position is special if:
            // 1. The value is 1
            // 2. It's the only 1 in its row
            // 3. It's the only 1 in its column
            if (mat[i][j] === 1 && rowCounts[i] === 1 && colCounts[j] === 1) {
                ++specialPositions;
            }
        }
    }
    
    return specialPositions;
};
