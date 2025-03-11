/**
 * Finds the maximum area of an island in a grid
 * 
 * @param {number[][]} grid - A 2D array where 1 represents land and 0 represents water
 * @return {number} - The maximum area of an island in the grid
 * 
 * @intuition
 * We can use depth-first search (DFS) to explore each island and calculate its area.
 * By marking visited cells as 0, we avoid revisiting them and prevent double counting.
 * 
 * @approach
 * 1. Iterate through each cell in the grid
 * 2. When we find a land cell (value 1), perform DFS to explore the entire island
 * 3. During DFS, mark visited cells as 0 to avoid revisiting
 * 4. Count the number of connected land cells to determine the area
 * 5. Keep track of the maximum area found
 * 
 * @complexity
 * Time complexity: O(m*n) where m is the number of rows and n is the number of columns
 * Space complexity: O(m*n) in worst case for the recursion stack
 */
const maxAreaOfIsland = (grid) => {
    // Get grid dimensions
    const rows = grid.length;
    const cols = grid[0].length;
    
    // Direction vectors for moving in 4 directions (up, right, down, left)
    const directions = [-1, 0, 1, 0, -1];
    
    /**
     * Performs DFS from a given cell to find the area of an island
     * @param {number} row - Current row
     * @param {number} col - Current column
     * @return {number} - Area of the island starting from this cell
     */
    const dfs = (row, col) => {
        // If cell is water, return 0
        if (grid[row][col] === 0) {
            return 0;
        }
        
        // Mark current cell as visited by changing it to water
        let area = 1;
        grid[row][col] = 0;
        
        // Explore all four adjacent cells
        for (let i = 0; i < 4; ++i) {
            const newRow = row + directions[i];
            const newCol = col + directions[i + 1];
            
            // Check if the adjacent cell is within bounds
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                area += dfs(newRow, newCol);
            }
        }
        
        return area;
    };
    
    // Find the maximum area by exploring each cell
    let maxArea = 0;
    for (let row = 0; row < rows; ++row) {
        for (let col = 0; col < cols; ++col) {
            maxArea = Math.max(maxArea, dfs(row, col));
        }
    }
    
    return maxArea;
};
