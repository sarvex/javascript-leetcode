/**
 * Two-pointer approach for sorted array
 * 
 * @intuition
 * Since the array is sorted, we can use two pointers starting from both ends of the array.
 * If the sum is too small, we move the left pointer right; if too large, we move the right pointer left.
 * 
 * @approach
 * 1. Initialize two pointers: left at the beginning and right at the end of the array
 * 2. Calculate the sum of elements at both pointers
 * 3. If sum equals target, return the indices (1-indexed)
 * 4. If sum is less than target, increment left pointer
 * 5. If sum is greater than target, decrement right pointer
 * 6. Repeat until a solution is found
 * 
 * @complexity
 * Time complexity: O(n) - We only need to traverse the array once in the worst case
 * Space complexity: O(1) - Constant extra space used
 * 
 * @param {number[]} numbers - A sorted array of integers
 * @param {number} target - The target sum to find
 * @return {number[]} - Indices of the two numbers (1-indexed) that add up to target
 */
const twoSum = (numbers, target) => {
  let left = 0;
  let right = numbers.length - 1;
  
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    
    if (sum === target) {
      return [left + 1, right + 1]; // Return 1-indexed positions
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
};
