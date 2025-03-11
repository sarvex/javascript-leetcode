/**
 * Apply operations to an array according to the following rules:
 * 1. If nums[i] == nums[i+1], then multiply nums[i] by 2 and set nums[i+1] to 0
 * 2. After the operations, move all zeros to the end of the array
 * @intuition First, we need to apply the doubling operation for adjacent equal elements.
 *            Then, we need to move all zeros to the end while maintaining the order of non-zero elements.
 * @approach Two-pass algorithm:
 *           1. First pass: Apply the doubling operation when adjacent elements are equal
 *           2. Second pass: Move all non-zero elements to the front, then fill the remaining positions with zeros *
 * @complexity Time: O(n), where n is the length of the input array. We make two passes through the array.
 *             Space: O(1), as we modify the array in-place without using extra space.
 * @param {number[]} nums - The input array of numbers
 * @return {number[]} - The array after applying all operations
 */
const applyOperations = (nums) => {
  const n = nums.length;

  // First pass: Apply doubling operation for adjacent equal elements
  for (let i = 0; i < n - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      nums[i] *= 2;
      nums[i + 1] = 0;
    }
  }

  // Second pass: Move non-zero elements to the front
  let nonZeroIdx = 0;

  for (let i = 0; i < n; i++) {
    if (nums[i] !== 0) {
      nums[nonZeroIdx++] = nums[i];
    }
  }

  // Fill remaining positions with zeros
  while (nonZeroIdx < n) {
    nums[nonZeroIdx++] = 0;
  }

  return nums;
}
