/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumCost = (nums) => {
  const n = nums.length

  // The first subarray always starts with nums[0]
  const firstSubarrayCost = nums[0]

  // Precompute minimum values for the third subarray
  // minSuffix[i] = minimum value in nums[i...n-1]
  const minSuffix = new Array(n)
  minSuffix[n - 1] = nums[n - 1]

  for (let i = n - 2; i >= 0; i--) {
    minSuffix[i] = Math.min(nums[i], minSuffix[i + 1])
  }

  let result = Infinity

  // For each possible starting position of the second subarray
  for (let i = 1; i < n - 1; i++) {
    // The minimum element for the third subarray is minSuffix[i+1]
    const minThirdElement = minSuffix[i + 1]

    // Calculate and update the minimum total cost
    result = Math.min(result, firstSubarrayCost + nums[i] + minThirdElement)
  }

  return result
}
