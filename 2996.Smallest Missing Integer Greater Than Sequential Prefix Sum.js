/**
 * @param {number[]} nums
 * @return {number}
 */
const missingInteger = (nums) => {
  // Find the longest sequential prefix
  let longestPrefixLength = 1
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1] + 1) {
      longestPrefixLength++
    } else {
      break
    }
  }

  // Calculate the sum of the longest sequential prefix
  let prefixSum = 0
  for (let i = 0; i < longestPrefixLength; i++) {
    prefixSum += nums[i]
  }

  // Find the smallest missing integer >= prefixSum
  const numSet = new Set(nums)
  let candidate = prefixSum

  while (numSet.has(candidate)) {
    candidate++
  }

  return candidate
}
