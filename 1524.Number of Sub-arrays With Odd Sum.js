/**
 * Calculates the number of subarrays with an odd sum.
 * 
 * @param {number[]} arr - The input array of integers
 * @return {number} - The count of subarrays with odd sum, modulo 10^9 + 7
 * 
 * @intuition
 * Track counts of even and odd running sums. When we encounter an even sum,
 * it forms odd-sum subarrays with all previous odd-sum positions.
 * When we encounter an odd sum, it forms odd-sum subarrays with all previous even-sum positions.
 * 
 * @approach
 * 1. Initialize counters for even and odd sums (even starts at 1 for empty subarray)
 * 2. Maintain a running sum while iterating through the array
 * 3. For each position, add to result based on current sum parity
 * 4. Return result modulo 10^9 + 7
 * 
 * @complexity
 * Time: O(n) where n is the length of the input array
 * Space: O(1) as we only use constant extra space
 */
const numOfSubarrays = (arr) => {
  const MOD = 1000000007;
  
  let odd = 0;
  let even = 1; // Start with 1 to account for empty subarray (sum = 0)
  let sum = 0;
  let result = 0;
  
  for (const num of arr) {
    sum += num;
    
    if (sum % 2 === 0) {
      result += odd;
      even++;
    } else {
      result += even;
      odd++;
    }
  }
  
  return result % MOD;
};
