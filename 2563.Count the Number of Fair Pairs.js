/**
 * Count fair pairs using two-pointer and sorting
 *
 * @intuition
 * Sorting enables efficient pair counting by leveraging order; two pointers can skip unnecessary checks.
 *
 * @approach
 * Sort the array. For each threshold, use a two-pointer lambda to count pairs with sum less than the threshold. The answer is the difference between counts for upper+1 and lower.
 *
 * @complexity
 * Time: O(n log n) (sorting dominates)
 * Space: O(1) (in-place sort, no extra space beyond variables)
 *
 * @param {number[]} nums - input array
 * @param {number} lower - lower sum bound
 * @param {number} upper - upper sum bound
 * @returns {number} fair pair count
 */
const countFairPairs = (nums, lower, upper) => {
  nums.sort((a, b) => a - b)
  const countLess = (threshold) => {
    let res = 0,
      l = 0,
      r = nums.length - 1
    while (l < r) nums[l] + nums[r] < threshold ? ((res += r - l), l++) : r--
    return res
  }
  return countLess(upper + 1) - countLess(lower)
}
