/**
 * Solves Maximal Rectangle using dynamic programming on histograms and a monotonic stack.
 *
 * @intuition
 * The problem asks for the largest rectangle containing only '1's in a binary matrix.
 * This looks similar to the "Largest Rectangle in Histogram" problem (LeetCode 84).
 * We can think of each row as defining the base of potential rectangles. For a given row `i`,
 * we can compute a histogram where the height of the bar at column `j` is the number of
 * consecutive '1's ending at `matrix[i][j]`.
 * By calculating the largest rectangle in the histogram for each row, we can find the overall
 * maximum rectangle area in the matrix.
 *
 * @approach
 * The core idea is to transform the 2D matrix problem into a series of 1D "Largest Rectangle in Histogram" problems.
 * For each row, we build a histogram where each bar's height represents the number of consecutive '1's directly above it in that column, including the cell in the current row.
 * We then calculate the largest rectangle area possible within this histogram using a monotonic stack. The stack stores indices of bars in increasing height order. When a shorter bar is encountered, taller bars are popped, and their potential rectangle area is calculated using the current bar's index as the right boundary and the previous element in the stack as the left boundary.
 * The maximum area found across all row-based histograms is the final answer. This leverages dynamic programming principles as the height calculation reuses information from the previous row.
 *
 * @complexity
 * Time complexity: O(rows * cols). We iterate through each cell of the matrix once to update heights and perform the stack operation. The stack operation for each row is O(cols).
 * Space complexity: O(cols). We need O(cols) space for the `heights` array and O(cols) space for the monotonic stack.
 *
 * @param {character[][]} matrix - The input binary matrix.
 * @returns {number} The area of the largest rectangle containing only 1's.
 */
const maximalRectangle = (matrix) => {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return 0;
  }

  const rows = matrix.length
  const cols = matrix[0].length
  // heights array includes a sentinel 0 at the end
  const heights = Array.from({ length: cols + 1 }, () => 0)
  let maxArea = 0

  for (const row of matrix) {
    // Update heights based on the current row
    for (let i = 0; i < cols; i++) {
      heights[i] = row[i] === '1' ? heights[i] + 1 : 0
    }

    // Calculate largest rectangle for the current heights histogram
    const stack = [-1]; // Initialize with sentinel for boundary calculation
    for (let i = 0; i < heights.length; i++) {
      // Pop elements from stack while current height is smaller
      while (stack[stack.length - 1] !== -1 && heights[stack[stack.length - 1]] > heights[i]) {
        const h = heights[stack.pop()];
        // Width is current index - index of previous element in stack - 1
        const w = i - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, h * w);
      }
      stack.push(i);
    }
     // Note: No need for a separate loop to clear the stack here
     // because the sentinel heights[cols] = 0 ensures all elements
     // are processed correctly within the main loop.
  }

  return maxArea;
};
