/**
 * Optimized median approach working with steps directly
 * @intuition
 * If we want to make all elements equal with minimum operations, we need to find a target value
 * that minimizes the total operations. This is a classic median problem. However, there's a key
 * constraint: we can only add or subtract x. This means all elements must have the same remainder
 * when divided by x for a solution to exist.
 *
 * @approach
 * 1. First check if all elements have the same remainder when divided by x
 * 2. If not, return -1 as it's impossible to make all elements equal
 * 3. Convert each element to the number of steps needed to reach the base value (remainder)
 * 4. Find the median of these steps
 * 5. Calculate the minimum operations by summing the absolute differences between each step and the median step
 *
 * @complexity
 * Time complexity: O(m*n log(m*n)) where m and n are the dimensions of the grid (due to sorting)
 * Space complexity: O(m*n) for storing the steps array
 *
 * @param {number[][]} grid - 2D grid of integers
 * @param {number} x - The value that can be added or subtracted
 * @return {number} - Minimum operations or -1 if impossible
 */
const minOperations = (grid, x) => {
  const steps = [];
  const mod = grid[0][0] % x;
  const rows = grid.length;
  const cols = grid[0].length;

  // Check if all elements have the same remainder and convert to steps
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] % x !== mod) {
        return -1;
      }
      steps.push((grid[i][j] - mod) / x);
    }
  }

  // Sort steps to find median
  steps.sort((a, b) => a - b);

  // Find the median step
  const medianStep = steps[Math.floor(steps.length / 2)];

  // Calculate total operations needed
  let operations = 0;
  for (const step of steps) {
    operations += Math.abs(step - medianStep);
  }

  return operations;
};
