/**
 * @param {number[][]} isWater - Matrix where 1 represents water cells and 0 represents land cells
 * @return {number[][]} - Matrix representing the height of each cell
 * 
 * @description
 * This solution finds the height map of a terrain where:
 * 1. Water cells have height 0
 * 2. Land cells must have positive heights
 * 3. Adjacent cells' heights can differ by at most 1
 * 
 * Approach:
 * - First, we convert the input matrix: water cells (1) become 0, land cells (0) become 1
 * - Then we use a dynamic programming approach with two passes:
 *   - Top-left to bottom-right: Each cell's height is determined by its top and left neighbors
 *   - Bottom-right to top-left: Each cell's height is updated based on its bottom and right neighbors
 * - This ensures each cell gets the minimum possible height satisfying all constraints
 * 
 * Time Complexity: O(m*n) where m is the number of rows and n is the number of columns
 * Space Complexity: O(1) as we modify the input matrix in-place
 */
const highestPeak = (isWater) => {
  const rows = isWater.length;
  const cols = isWater[0].length;
  const MAX_POSSIBLE_HEIGHT = rows + cols; // Maximum possible height in worst case

  // Step 1: Convert water cells (1) to height 0, and land cells (0) to height 1 (temporary)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      isWater[row][col] = isWater[row][col] === 1 ? 0 : 1;
    }
  }

  // Step 2: First pass - top-left to bottom-right
  // Each cell's height is minimum of (top neighbor + 1) and (left neighbor + 1)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (isWater[row][col] !== 0) { // Skip water cells (height 0)
        let heightFromTop = MAX_POSSIBLE_HEIGHT;
        let heightFromLeft = MAX_POSSIBLE_HEIGHT;

        // Check top neighbor if it exists
        if (row > 0) {
          heightFromTop = isWater[row - 1][col];
        }
        
        // Check left neighbor if it exists
        if (col > 0) {
          heightFromLeft = isWater[row][col - 1];
        }

        // Set cell height to minimum of top and left + 1
        isWater[row][col] = Math.min(heightFromTop, heightFromLeft) + 1;
      }
    }
  }

  // Step 3: Second pass - bottom-right to top-left
  // Update each cell's height based on its bottom and right neighbors
  for (let row = rows - 1; row >= 0; row--) {
    for (let col = cols - 1; col >= 0; col--) {
      if (isWater[row][col] !== 0) { // Skip water cells (height 0)
        let heightFromBottom = MAX_POSSIBLE_HEIGHT;
        let heightFromRight = MAX_POSSIBLE_HEIGHT;

        // Check bottom neighbor if it exists
        if (row < rows - 1) {
          heightFromBottom = isWater[row + 1][col];
        }
        
        // Check right neighbor if it exists
        if (col < cols - 1) {
          heightFromRight = isWater[row][col + 1];
        }

        // Update cell height to minimum of current height and (min of bottom/right + 1)
        const newPossibleHeight = Math.min(heightFromBottom, heightFromRight) + 1;
        isWater[row][col] = Math.min(isWater[row][col], newPossibleHeight);
      }
    }
  }

  return isWater;
};
