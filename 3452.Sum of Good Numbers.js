/**
 * Calculates the sum of all "good numbers" in an array.
 * A number at index i is considered "good" if:
 * 1. It's greater than the number at index (i-k) if i-k is valid, AND
 * 2. It's greater than the number at index (i+k) if i+k is valid
 *
 * Time Complexity: O(n) where n is the length of nums
 * Space Complexity: O(1) - constant extra space
 *
 * @param {number[]} nums - The input array of numbers
 * @param {number} k - The distance parameter for comparison
 * @return {number} - The sum of all good numbers
 */
const sumOfGoodNumbers = (nums, k) => {
  // Early return for edge cases
  if (!nums || nums.length === 0) {
    return 0;
  }
  
  const arrayLength = nums.length;
  let goodNumbersSum = 0;
  
  // Iterate through the array once
  for (let currentIndex = 0; currentIndex < arrayLength; ++currentIndex) {
    const currentNumber = nums[currentIndex];
    
    // Check conditions for a "good" number
    let isGood = true;
    
    // Check if current number is greater than the number k positions before
    if (currentIndex >= k) {
      isGood = isGood && (currentNumber > nums[currentIndex - k]);
    }
    
    // Check if current number is greater than the number k positions after
    if (currentIndex + k < arrayLength) {
      isGood = isGood && (currentNumber > nums[currentIndex + k]);
    }
    
    // If the number is "good", add it to our sum
    if (isGood) {
      goodNumbersSum += currentNumber;
    }
  }
  
  // Return the final sum of all good numbers
  return goodNumbersSum;
}
