/**
 * Finds three non-overlapping subarrays of size k with the maximum sum.
 *
 * @param {number[]} nums - The input array of integers
 * @param {number} k - The size of each subarray
 * @return {number[]} - The starting indices of the three subarrays with maximum sum
 * 
 * @description
 * This solution uses a sliding window approach with dynamic programming:
 * 1. Maintain three sliding windows of size k
 * 2. Track the best single, double, and triple subarray configurations
 * 3. For each position, update the best configurations if better sums are found
 * 
 * Time Complexity: O(n) where n is the length of nums
 * Space Complexity: O(1) as we only use a constant amount of extra space
 */
const maxSumOfThreeSubarrays = (nums, k) => {
  // Initialize best indices for optimal subarray configurations
  let bestSingleIndex = 0;
  let bestDoubleIndices = [0, k];
  let bestTripleIndices = [0, k, k * 2];

  // Initialize sums for the first window positions
  let singleWindowSum = 0;
  let doubleWindowSum = 0;
  let tripleWindowSum = 0;

  // Calculate initial sums for each window
  for (let i = 0; i < k; i++) {
    singleWindowSum += nums[i];
  }
  for (let i = k; i < k * 2; i++) {
    doubleWindowSum += nums[i];
  }
  for (let i = k * 2; i < k * 3; i++) {
    tripleWindowSum += nums[i];
  }

  // Track best sums found so far
  let bestSingleSum = singleWindowSum;
  let bestDoubleSum = singleWindowSum + doubleWindowSum;
  let bestTripleSum = singleWindowSum + doubleWindowSum + tripleWindowSum;

  // Initialize sliding window pointers
  let singleStart = 1;
  let doubleStart = k + 1;
  let tripleStart = k * 2 + 1;

  // Slide all windows through the array simultaneously
  while (tripleStart <= nums.length - k) {
    // Update window sums by adding new element and removing oldest element
    singleWindowSum = singleWindowSum + nums[singleStart + k - 1] - nums[singleStart - 1];
    doubleWindowSum = doubleWindowSum + nums[doubleStart + k - 1] - nums[doubleStart - 1];
    tripleWindowSum = tripleWindowSum + nums[tripleStart + k - 1] - nums[tripleStart - 1];

    // Update best single window if current is better
    if (singleWindowSum > bestSingleSum) {
      bestSingleIndex = singleStart;
      bestSingleSum = singleWindowSum;
    }

    // Update best double window if current combination is better
    const currentDoubleSum = bestSingleSum + doubleWindowSum;
    if (currentDoubleSum > bestDoubleSum) {
      bestDoubleIndices = [bestSingleIndex, doubleStart];
      bestDoubleSum = currentDoubleSum;
    }

    // Update best triple window if current combination is better
    const currentTripleSum = bestDoubleSum + tripleWindowSum;
    if (currentTripleSum > bestTripleSum) {
      bestTripleIndices = [bestDoubleIndices[0], bestDoubleIndices[1], tripleStart];
      bestTripleSum = currentTripleSum;
    }

    // Advance all window pointers
    singleStart++;
    doubleStart++;
    tripleStart++;
  }

  return bestTripleIndices;
};
