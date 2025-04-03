/**
 * Find the maximum triplet value using a single pass and dynamic tracking.
 * @intuition We want to maximize `(nums[i] - nums[j]) * nums[k]` where `i < j < k`.
 *   As we iterate through the array considering `nums[k]`, we need the maximum possible value
 *   of `(nums[i] - nums[j])` encountered so far where `i < j < k`. This requires tracking
 *   the maximum element `nums[i]` seen so far and the maximum difference `nums[i] - nums[j]`
 *   seen so far.
 * @approach
 *   1. Initialize `maxTripletValue = 0`, `max_i = 0` (maximum element encountered so far, representing `nums[i]`),
 *      and `max_i_minus_j = 0` (maximum difference `nums[i] - nums[j]` encountered so far).
 *   2. Iterate through the array `nums` with the current element `num` representing `nums[k]`.
 *   3. In each iteration:
 *      a. Update `maxTripletValue`: Calculate the potential value using the current `num` (`nums[k]`)
 *         and the `max_i_minus_j` found for indices `i < j` before `k`.
 *         `maxTripletValue = Math.max(maxTripletValue, max_i_minus_j * num)`.
 *      b. Update `max_i`: Track the maximum element encountered up to the current position.
 *         `max_i = Math.max(max_i, num)`. This `max_i` will be used as `nums[i]` in future `max_i_minus_j` calculations.
 *      c. Update `max_i_minus_j`: Track the maximum difference `nums[i] - nums[j]` seen so far.
 *         `max_i_minus_j = Math.max(max_i_minus_j, max_i - num)`. Here, `max_i` represents the maximum `nums[i]` found before the current `num` (which acts as `nums[j]`),
 *         ensuring `i < j`.
 *   4. Return `maxTripletValue`. The constraints mention non-negative results, so we initialize with 0.
 * @complexity
 *   - Time: O(n), where n is the length of `nums`. We iterate through the array once.
 *   - Space: O(1). We use only a constant amount of extra space.
 * @param {number[]} nums - The input array of numbers.
 * @return {number} The maximum value of `(nums[i] - nums[j]) * nums[k]` such that `i < j < k`, or 0 if no such triplet exists or all result values are negative.
 */
const maximumTripletValue = nums => {
  let maxTripletValue = 0
  let max_i = 0
  let max_i_minus_j = 0

  for (const num of nums) {
    maxTripletValue = Math.max(maxTripletValue, max_i_minus_j * num)
    max_i = Math.max(max_i, num)
    max_i_minus_j = Math.max(max_i_minus_j, max_i - num)
  }
  return maxTripletValue
}
