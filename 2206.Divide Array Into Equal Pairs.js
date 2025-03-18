/**
 * Determines if an array can be divided into pairs where each pair consists of equal elements
 * 
 * @param {number[]} nums - The input array of integers
 * @return {boolean} - True if the array can be divided into equal pairs, false otherwise
 * 
 * @intuition
 * If we can divide the array into equal pairs, each number must appear an even number of times.
 * We can count the frequency of each number and check if all frequencies are even.
 * 
 * @approach
 * 1. Create a frequency map to count occurrences of each number
 * 2. Iterate through the frequency map and return false immediately if any count is odd
 * 3. Return true if all counts are even
 * 
 * @complexity
 * Time: O(n) where n is the length of the input array
 * Space: O(n) in the worst case when all elements are unique
 */
const divideArray = (nums) => {
  const frequency = {};
  
  for (const num of nums) {
    frequency[num] = (frequency[num] || 0) + 1;
  }
  
  for (const key in frequency) {
    if (frequency[key] % 2 !== 0) {
      return false;
    }
  }
  
  return true;
};
