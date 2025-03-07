/**
 * Decrypts a circular array based on a key value.
 *
 * @param {number[]} code - The circular array to decrypt
 * @param {number} k - The key that determines the decryption rule:
 *                    - If k > 0: Replace each number with the sum of the next k numbers
 *                    - If k < 0: Replace each number with the sum of the previous |k| numbers
 *                    - If k = 0: Replace each number with 0
 * @return {number[]} - The decrypted array
 * 
 * Approach:
 * 1. Create a prefix sum array of a doubled version of the input array
 * 2. For each position, calculate the sum of k elements using the prefix sum
 * 3. Handle the circular nature of the array by using modulo arithmetic
 * 
 * Time Complexity: O(n) where n is the length of the code array
 * Space Complexity: O(n) for the prefix sum array and result array
 */
const decrypt = (code, k) => {
  const length = code.length;
  const decrypted = Array(length).fill(0);

  // Special case: k = 0 means replace all elements with 0
  if (k === 0) {
    return decrypted;
  }

  // Create a prefix sum array of doubled code to handle circular nature
  // This allows us to easily calculate sums of consecutive elements
  const prefixSum = Array(2 * length + 1).fill(0);
  for (let i = 0; i < 2 * length; i++) {
    prefixSum[i + 1] = prefixSum[i] + code[i % length];
  }

  // Calculate the decrypted value for each position
  for (let i = 0; i < length; i++) {
    if (k > 0) {
      // Sum of next k elements
      decrypted[i] = prefixSum[i + k + 1] - prefixSum[i + 1];
    } else {
      // Sum of previous |k| elements
      decrypted[i] = prefixSum[i + length] - prefixSum[i + k + length];
    }
  }

  return decrypted;
}
