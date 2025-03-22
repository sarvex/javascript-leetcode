/**
 * Rotate Array - Splice and Unshift Approach
 * 
 * @intuition
 * We can directly extract the last k elements and place them at the beginning.
 * This approach uses JavaScript's built-in array methods to manipulate the array.
 * 
 * @approach
 * 1. Normalize k by taking k modulo array length
 * 2. Early return if k is 0 (no rotation needed)
 * 3. Extract the last k elements using splice(-k)
 * 4. Insert these elements at the beginning using unshift with spread operator
 * 
 * @complexity
 * Time: O(n) where n is the length of the array
 * Space: O(k) for temporarily storing the k elements
 * 
 * @param {number[]} nums - The array to be rotated
 * @param {number} k - The number of steps to rotate the array to the right
 * @return {void} Do not return anything, modify nums in-place instead
 */
const rotate = (nums, k) => {
  k %= nums.length;
  if (k === 0) return;
  
  const secondPart = nums.splice(-k);
  nums.unshift(...secondPart);
};
