/**
 * Finds the minimal length subarray in an infinite array with sum >= target
 * The infinite array is defined as nums concatenated with itself infinitely
 *
 * @param {number[]} nums - Array of positive integers
 * @param {number} target - Target sum to reach
 * @return {number} - Minimal subarray length or -1 if none exists
 */
const minSizeSubarray = (nums, target) => {
  const arrayLength = nums.length;
  const totalSum = nums.reduce((sum, num) => sum + num, 0);
  
  // Handle complete cycles case
  if (target % totalSum === 0) {
    return (target / totalSum) * arrayLength;
  }
  
  const completeCycles = Math.floor(target / totalSum);
  const remainingTarget = target % totalSum;
  
  // Use sliding window for finding minimum subarray with sum = remainingTarget
  let minLength = Infinity;
  let currentSum = 0;
  
  for (let right = 0, left = 0; right < 2 * arrayLength; right++) {
    currentSum += nums[right % arrayLength];
    
    while (left <= right && currentSum > remainingTarget) {
      currentSum -= nums[left % arrayLength];
      left++;
    }
    
    if (currentSum === remainingTarget) {
      minLength = Math.min(minLength, right - left + 1);
    }
  }
  
  return minLength === Infinity ? -1 : completeCycles * arrayLength + minLength;
};
