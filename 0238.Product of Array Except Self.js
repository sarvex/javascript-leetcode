/**
 * Calculates an array where each element is the product of all elements in the input array except the element at that index
 *
 * @intuition
 * To avoid using division, we can calculate products from left to right and then from right to left.
 * First pass builds products of all elements to the left of each position.
 * Second pass multiplies by products of all elements to the right of each position.
 *
 * @approach
 * 1. Initialize result array with 1s
 * 2. First pass: Iterate from left to right, tracking prefix product
 * 3. Second pass: Iterate from right to left, tracking suffix product
 * 4. Multiply each position's prefix product by its suffix product
 *
 * @complexity
 * Time complexity: O(n) where n is the length of the input array
 * Space complexity: O(1) excluding the output array
 *
 * @param {number[]} nums - The input array of numbers
 * @return {number[]} - Array where each element is the product of all elements except self
 */
const productExceptSelf = (nums) => {
  const output = Array(nums.length).fill(1)

  // Calculate products of all elements to the left (prefix)
  let prefix = 1
  for (let i = 0; i < nums.length; i++) {
    output[i] *= prefix
    prefix *= nums[i]
  }

  // Multiply by products of all elements to the right (suffix)
  let suffix = 1
  for (let i = nums.length - 1; i >= 0; i--) {
    output[i] *= suffix
    suffix *= nums[i]
  }

  return output
}
