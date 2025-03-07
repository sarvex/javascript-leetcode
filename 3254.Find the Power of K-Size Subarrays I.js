/**
 * This function calculates the power of each k-size subarray in a given array.
 * For each k-size subarray, if all elements form a consecutive sequence, the power
 * is the maximum element in that subarray; otherwise, the power is -1.
 *
 * @param {number[]} nums - A strictly increasing array of positive integers
 * @param {number} k - The size of the subarrays to consider
 * @return {number[]} - An array where the ith element is the power of the subarray nums[i-k+1...i]
 *
 * Time Complexity: O(n) where n is the length of the nums array
 * Space Complexity: O(n) for the output array
 */
const resultsArray = (nums, k) => {
  const arrayLength = nums.length
  const powerValues = []

  let sequenceStartIndex = 0

  for (let currentIndex = 0; currentIndex < arrayLength; currentIndex++) {
    // Check if the current element breaks the consecutive sequence
    if (currentIndex > 0 && nums[currentIndex - 1] + 1 !== nums[currentIndex]) {
      sequenceStartIndex = currentIndex
    }

    // Only calculate power for complete k-size subarrays
    if (currentIndex >= k - 1) {
      // If the subarray's start index is before the current sequence start,
      // then the subarray contains non-consecutive elements
      const subarrayStartIndex = currentIndex - k + 1
      const isPowerful = subarrayStartIndex >= sequenceStartIndex

      // Power is the maximum element (which is the last element in a strictly increasing array)
      // or -1 if the subarray contains non-consecutive elements
      powerValues.push(isPowerful ? nums[currentIndex] : -1)
    }
  }

  return powerValues
}
