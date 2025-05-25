/**
 * Difference array technique to track operations
 *
 * @intuition
 * We need to check if it's possible to make nums a zero array by applying operations.
 * Each operation allows us to decrement all elements in a range [l,r] by 1.
 * The key insight is that we can track the total number of operations applied
 * to each position using a difference array technique.
 *
 * @approach
 * 1. Create a difference array to track operations at each index
 * 2. For each query [l,r], increment d[l] and decrement d[r+1]
 * 3. Calculate the prefix sum of the difference array to get operations at each index
 * 4. Check if each element in nums can be reduced to zero (nums[i] ≤ operations[i])
 *
 * @complexity
 * Time: O(n + q) where n is the length of nums and q is the number of queries
 * Space: O(n) for the difference array
 *
 * @param {number[]} nums - The input array of integers
 * @param {number[][]} queries - Array of [l,r] ranges for operations
 * @return {boolean} - Whether it's possible to transform nums to a zero array
 */
const isZeroArray = (nums, queries) => {
  const diffArray = new Array(nums.length + 1).fill(0)

  for (const [start, end] of queries) {
    diffArray[start]++
    diffArray[end + 1]--
  }

  let operationCount = 0
  for (let i = 0; i < nums.length; i++) {
    operationCount += diffArray[i]
    if (nums[i] > operationCount) {
      return false
    }
  }

  return true
}
 