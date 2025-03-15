/**
 * Moves all zeros in the array to the end while maintaining the relative order of non-zero elements
 * 
 * @intuition
 * Use a two-pointer technique to track the position where non-zero elements should be placed
 * and swap elements accordingly.
 * 
 * @approach
 * 1. Maintain a pointer 'i' that points to the position where the next non-zero element should go
 * 2. Iterate through the array with pointer 'j'
 * 3. When a non-zero element is found, swap it with the element at position 'i' and increment 'i'
 * 4. This ensures all non-zero elements are moved to the front while zeros naturally end up at the end
 * 
 * @complexity
 * Time complexity: O(n) where n is the length of the array
 * Space complexity: O(1) as we modify the array in-place with constant extra space
 * 
 * @param {number[]} nums - The array to be modified
 * @return {void} Do not return anything, modify nums in-place instead
 */
const moveZeroes = (nums) => {
  let i = -1;
  
  for (let j = 0; j < nums.length; ++j) {
    if (nums[j]) {
      const temp = nums[++i];
      nums[i] = nums[j];
      nums[j] = temp;
    }
  }
};
