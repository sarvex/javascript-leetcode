/**
 * Finds the maximum area that can be formed between vertical lines using the heights array
 *
 * @intuition
 * Use two pointers at the beginning and end of the array to find the maximum area.
 * The area is determined by the minimum height of the two lines multiplied by the distance between them.
 * Move the pointer with the smaller height inward as it's the limiting factor.
 *
 * @approach
 * 1. Initialize two pointers at the beginning and end of the array
 * 2. Calculate the area between the two pointers
 * 3. Update the maximum area if the current area is larger
 * 4. Move the pointer with the smaller height inward
 * 5. Repeat until the pointers meet
 *
 * @complexity
 * Time complexity: O(n) where n is the length of the height array
 * Space complexity: O(1) as we only use constant extra space
 *
 * @param {number[]} height - Array of heights representing vertical lines
 * @return {number} - Maximum area that can be formed
 */
const maxArea = (height) => {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const currentArea = minHeight * width;

    maxWater = Math.max(maxWater, currentArea);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
};
