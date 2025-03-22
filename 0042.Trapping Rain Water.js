/**
 * Two-pointer Optimized Approach
 * 
 * @intuition
 * Water gets trapped between bars when there are higher bars on both sides.
 * Instead of precomputing left and right maximums, we can use two pointers
 * to track them on-the-fly, reducing space complexity to O(1).
 * 
 * @approach
 * 1. Use two pointers (left and right) starting from the ends of the array
 * 2. Track the maximum height seen so far from both sides
 * 3. Always process the side with the smaller maximum height
 * 4. For each position, add the difference between the current maximum and height
 * 5. Continue until the pointers meet
 * 
 * @complexity
 * Time complexity: O(n) where n is the length of the height array
 * Space complexity: O(1) as we only use a constant amount of extra space
 * 
 * @param {number[]} height - Array of heights representing elevation map
 * @return {number} - Total amount of rainwater trapped
 */
const trap = (height) => {
  if (!height || height.length <= 2) return 0;
  
  let left = 0;
  let right = height.length - 1;
  let leftMax = height[left];
  let rightMax = height[right];
  let water = 0;
  
  while (left < right) {
    if (leftMax < rightMax) {
      left++;
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
    } else {
      right--;
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
    }
  }
  
  return water;
}
