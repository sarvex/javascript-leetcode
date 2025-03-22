/**
 * In-place Two-pointer Technique
 * 
 * @intuition
 * Since the array is already sorted, duplicates will be adjacent to each other.
 * We can use a two-pointer approach where one pointer (k) tracks the position
 * for the next unique element, and another pointer iterates through the array.
 * 
 * @approach
 * 1. Initialize a pointer k = 0 to track the position for the next unique element
 * 2. Iterate through the array with a for...of loop
 * 3. For each element, check if it's different from the previous unique element
 * 4. If it is unique (or it's the first element), place it at position k and increment k
 * 5. Return k as the new length of the modified array
 * 
 * @complexity
 * Time complexity: O(n) - We iterate through the array once
 * Space complexity: O(1) - We modify the array in-place with constant extra space
 * 
 * @param {number[]} nums - A sorted array of integers
 * @return {number} - The new length of the array after removing duplicates
 */
const removeDuplicates = nums => {
  let k = 0;
  for (const x of nums) {
    if (k === 0 || x !== nums[k - 1]) {
      nums[k++] = x;
    }
  }
  return k;
};
