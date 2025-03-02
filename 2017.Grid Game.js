/**
 * Grid Game - LeetCode 2017
 * 
 * This function determines the minimum possible score that the first robot can guarantee,
 * regardless of how the second robot plays optimally.
 * 
 * Approach:
 * 1. The first robot must choose a cell to go down from the top row to the bottom row
 * 2. After the first robot's path, the second robot will choose the path that maximizes its score
 * 3. The first robot wants to minimize the maximum score the second robot can get
 * 4. We simulate different points where the first robot can go down and find the optimal choice
 * 
 * Time Complexity: O(n) where n is the length of the grid
 * Space Complexity: O(1) as we only use a constant amount of extra space
 * 
 * @param {number[][]} grid - A 2x n grid of non-negative integers
 * @return {number} - The minimum possible score the second robot can achieve
 */
const gridGame = (grid) => {
  const gridWidth = grid[0].length;
  
  // Calculate the initial sum of the top row (potential path for robot 2)
  let remainingTopRowSum = grid[0].reduce((sum, value) => sum + value, 0);
  let bottomRowSum = 0;
  let minimumSecondRobotScore = Number.MAX_SAFE_INTEGER;
  
  // Try each possible position where robot 1 can go down
  for (let column = 0; column < gridWidth; column++) {
    // Update sums as robot 1 collects cells
    remainingTopRowSum -= grid[0][column];
    
    // Calculate the maximum score robot 2 can get
    // Robot 2 will choose the path with the maximum remaining points
    const secondRobotBestScore = Math.max(remainingTopRowSum, bottomRowSum);
    
    // Robot 1 wants to minimize robot 2's maximum score
    minimumSecondRobotScore = Math.min(minimumSecondRobotScore, secondRobotBestScore);
    
    // Update bottom row sum for the next iteration
    bottomRowSum += grid[1][column];
  }
  
  return minimumSecondRobotScore;
};
