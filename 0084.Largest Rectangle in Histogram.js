/**
 * Find the largest rectangle area using a monotonic stack.
 * @intuition: For each bar, the largest rectangle containing that bar as the minimum height extends left and right until a shorter bar is found. A monotonic stack helps efficiently find these boundaries.
 * @approach: Iterate through the bars from index 0 up to and including `heights.length`. Maintain a stack storing indices of bars in increasing height. Inside the loop, use a `while` condition to process bars: continue as long as the stack is not empty AND (we've reached the end OR the current bar `heights[i]` is shorter than or equal to the bar at the stack's top index). When the `while` condition is met, pop an index from the stack. Calculate the height (from the popped index) and width. The width is `i` if the stack becomes empty after popping (meaning the popped bar was the shortest so far, extending to the beginning), otherwise it's `i - stack[stack.length - 1] - 1` (current index minus the index of the next shorter bar to the left minus 1). Update `maxArea`. After the `while` loop, push the current index `i` onto the stack. This ensures the stack always maintains indices of bars in increasing height order relative to the bars processed so far.
 * @complexity:
 *   Time: O(n), where n is the number of bars. Each index is pushed and popped at most once.
 *   Space: O(n), for the stack in the worst case (e.g., heights are sorted ascendingly).
 * @param {number[]} heights - An array of integers representing histogram bar heights.
 * @returns {number} - The area of the largest rectangle in the histogram.
 */
const largestRectangleArea = (heights) => {
  const stack = []; // Initialize an empty stack to store indices.
  let maxArea = 0;

  // Iterate from the first bar up to a virtual position *after* the last bar.
  // This virtual position helps process any remaining bars in the stack.
  for (let i = 0; i <= heights.length; i++) {
    // While the stack is not empty AND
    // (we are at the virtual end OR the current height is <= height at stack top index)
    // This means the bar at stack top can potentially form its maximum rectangle ending *before* index i.
    while (
      stack.length > 0 &&
      (i === heights.length || heights[i] <= heights[stack[stack.length - 1]])
    ) {
      // Pop the index of the bar to calculate its max rectangle area.
      const height = heights[stack.pop()];
      // Calculate width:
      // If stack is empty, the rectangle extends to the beginning (index 0), so width is i.
      // Otherwise, width is distance from current index i to the index of the previous smaller bar (stack top) minus 1.
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    // Push the current index onto the stack.
    // If heights[i] was greater than the previous stack top, it starts a new potential taller rectangle.
    // If heights[i] caused pops, it now becomes the new (potentially shorter) right boundary reference.
    stack.push(i);
  }

  return maxArea;
};
