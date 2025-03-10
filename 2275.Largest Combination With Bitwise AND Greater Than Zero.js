/**
 * Finds the size of the largest combination of array elements with a bitwise AND greater than zero
 *
 * @param {number[]} candidates - Array of positive integers
 * @return {number} - Size of the largest valid combination
 *
 * Approach:
 * For a combination to have a bitwise AND > 0, at least one bit position must have 1s in all numbers
 * We count how many numbers have a 1 at each bit position, and the maximum count is our answer
 *
 * Time Complexity: O(n * log(max)), where n is the array length and max is the maximum value in the array
 * Space Complexity: O(1), only using constant extra space
 */
const largestCombination = (candidates) => {
  const maxNumber = Math.max(...candidates);
  const bitLength = maxNumber.toString(2).length;
  let maxCombinationSize = 0;
  
  for (let bitPosition = 0; bitPosition < bitLength; bitPosition++) {
    let numbersWithSetBit = 0;
    
    for (const number of candidates) {
      numbersWithSetBit += (number >> bitPosition) & 1;
    }
    
    maxCombinationSize = Math.max(maxCombinationSize, numbersWithSetBit);
  }
  
  return maxCombinationSize;
}
