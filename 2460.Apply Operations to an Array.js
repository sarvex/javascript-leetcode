/**
 * Apply operations to an array according to the following rules:
 * 1. If nums[i] == nums[i+1], then multiply nums[i] by 2 and set nums[i+1] to 0
 * 2. After the operations, move all zeros to the end of the array
 *
 * @param {number[]} nums - The input array of numbers
 * @return {number[]} - The array after applying all operations
 */
const applyOperations = (nums) => {
  const arrayLength = nums.length

  // Apply the first operation in-place: double equal adjacent elements
  for (let i = 0; i < arrayLength - 1; ++i) {
    if (nums[i] === nums[i + 1]) {
      nums[i] *= 2
      nums[i + 1] = 0
    }
  }

  // Move all non-zero elements to the front in-place (single pass)
  let nonZeroIndex = 0
  for (let i = 0; i < arrayLength; i++) {
    if (nums[i] !== 0) {
      // Only swap if indices are different to avoid unnecessary operations
      if (i !== nonZeroIndex) {
        nums[nonZeroIndex] = nums[i]
        nums[i] = 0
      }
      nonZeroIndex++
    }
  }

  return nums
}
