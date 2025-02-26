/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumArrayLength = function (nums) {
  if (nums.length <= 1) return nums.length

  // Find minimum value in the first pass
  let min = nums[0]
  for (let i = 1; i < nums.length; i++) {
    min = Math.min(min, nums[i])
  }

  // Second pass: count min occurrences and check if any number isn't divisible by min
  let minCount = 0

  for (const num of nums) {
    if (num === min) {
      minCount++
    } else if (num % min !== 0) {
      return 1 // We can create a value < min, so we can reduce to length 1
    }
  }

  // If all numbers are divisible by min, we need ceil(minCount/2) elements
  return Math.ceil(minCount / 2)
}
