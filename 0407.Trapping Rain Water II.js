/**
 * @param {number[][]} heightMap - 2D elevation map where each cell represents height
 * @return {number} - Total volume of water trapped after raining
 *
 * @description
 * This solution uses an iterative approach to solve the Trapping Rain Water II problem:
 * 1. We create a copy of the height map to track water levels
 * 2. We repeatedly scan the grid in two directions (top-left to bottom-right and bottom-right to top-left)
 * 3. For each cell, we update its water level based on its neighbors' water levels
 * 4. We continue until no more updates are possible
 * 5. Finally, we calculate the trapped water by comparing the water levels with original heights
 *
 * Time Complexity: O(m²*n²) in worst case, where m and n are the dimensions of the heightMap
 *   - The while loop might run up to m*n times in the worst case
 *   - Each iteration scans all cells twice: O(m*n)
 *
 * Space Complexity: O(m*n) for the water levels array
 */

/**
 * Traps rainwater in a 2D elevation map and returns the total volume
 */
const trapRainWater = (heightMap) => {
  const rows = heightMap.length
  const cols = heightMap[0].length

  // Create a copy of the height map to track water levels
  const waterLevels = Array.from({ length: rows }, (_, i) => heightMap[i].slice())

  let hasUpdates = true
  let isFirstIteration = true

  // Continue until no more updates are possible
  while (hasUpdates) {
    hasUpdates = false

    // Scan from top-left to bottom-right
    for (let i = 1; i < rows - 1; i++) {
      for (let j = 1; j < cols - 1; j++) {
        // Calculate new water level based on north and west neighbors
        const newWaterLevel = Math.max(heightMap[i][j], Math.min(waterLevels[i - 1][j], waterLevels[i][j - 1]))

        // Update if it's the first iteration or the new level is lower
        if (isFirstIteration || waterLevels[i][j] > newWaterLevel) {
          waterLevels[i][j] = newWaterLevel
          hasUpdates = true
        }
      }
    }

    isFirstIteration = false

    // Scan from bottom-right to top-left
    for (let i = rows - 2; i >= 1; i--) {
      for (let j = cols - 2; j >= 1; j--) {
        // Calculate new water level based on south and east neighbors
        const newWaterLevel = Math.max(heightMap[i][j], Math.min(waterLevels[i + 1][j], waterLevels[i][j + 1]))

        // Update if the new level is lower
        if (waterLevels[i][j] > newWaterLevel) {
          waterLevels[i][j] = newWaterLevel
          hasUpdates = true
        }
      }
    }
  }

  // Calculate total trapped water
  let totalWater = 0

  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < cols - 1; j++) {
      // If water level is higher than the original height, water is trapped
      if (waterLevels[i][j] > heightMap[i][j]) {
        totalWater += waterLevels[i][j] - heightMap[i][j]
      }
    }
  }

  return totalWater
}
