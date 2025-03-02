/**
 * 494. Target Sum
 *
 * You are given an integer array nums and an integer target.
 * You want to build an expression out of nums by adding one of the symbols '+' and '-'
 * before each integer in nums and then concatenate all the integers.
 * Return the number of different expressions that you can build, which evaluates to target.
 *
 * @param {number[]} nums - The array of integers to build expressions from
 * @param {number} target - The target sum to achieve
 * @return {number} - The number of different ways to build expressions that evaluate to target
 *
 * @example
 * Input: nums = [1,1,1,1,1], target = 3
 * Output: 5
 * Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3:
 * -1 + 1 + 1 + 1 + 1 = 3
 * +1 - 1 + 1 + 1 + 1 = 3
 * +1 + 1 - 1 + 1 + 1 = 3
 * +1 + 1 + 1 - 1 + 1 = 3
 * +1 + 1 + 1 + 1 - 1 = 3
 *
 * Solution Approach:
 * This problem can be transformed into a subset sum problem:
 * 1. Let P be the subset of numbers with + sign, and N be the subset with - sign
 * 2. We know that P + N = sum(nums) and P - N = target
 * 3. From these equations: P = (sum(nums) + target) / 2
 * 4. The problem becomes: find the number of subsets with sum equal to P
 * 5. We use dynamic programming to solve this subset sum problem
 *
 * Time Complexity: O(n * sum) where n is the length of nums and sum is the sum of all elements
 * Space Complexity: O(n * sum) - can be optimized to O(sum) with 1D DP array
 */
const findTargetSumWays = (nums, target) => {
  // Calculate the total sum of the array
  const totalSum = nums.reduce((sum, num) => sum + num, 0);

  // Early termination checks:
  // 1. If totalSum < target, it's impossible to reach the target
  // 2. If (totalSum + target) is odd, it's impossible to have an integer subset sum
  if (totalSum < Math.abs(target) || (totalSum + target) % 2 !== 0) {
    return 0;
  }

  // Calculate the target subset sum using the formula: P = (sum + target) / 2
  const subsetSum = ((totalSum + target) / 2);

  // Initialize DP array - dp[j] represents the number of ways to get sum j
  const result = new Array(subsetSum + 1).fill(0);
  result[0] = 1; // Base case: there's 1 way to make sum 0 (by taking no elements)

  // Fill the DP array
  for (const num of nums) {
    // Iterate backwards to avoid counting the same element multiple times
    for (let currentSum = subsetSum; currentSum >= num; currentSum--) {
      result[currentSum] += result[currentSum - num];
    }
  }

  return result[subsetSum];
};
