/**
 * Given a non-negative integer, you could swap two digits at most once to get the maximum valued number.
 * Return the maximum valued number you could get.
 *
 * @intuition
 * To maximize the value after a swap, we want to move the largest digit to the most significant position.
 * We scan from right to left to find the maximum digit encountered so far for each position.
 * Then we scan from left to right to find the first digit that can be swapped with a larger digit from its right.
 *
 * @approach
 * 1. Convert the number to an array of digits for easier manipulation
 * 2. Scan from right to left, tracking the maximum digit and its position
 * 3. When we find a digit smaller than the maximum seen so far, mark it for swapping
 * 4. Perform the swap if valid candidates were found
 * 5. Convert back to a number and return
 *
 * @complexity
 * Time: O(n) where n is the number of digits in the input number
 * Space: O(n) for storing the digits array
 * 
 * @param {number} num - The input number
 * @return {number} - The maximum number after at most one swap
 */
const maximumSwap = num => {
  const digits = Array.from(String(num), Number);
  const n = digits.length;
  
  // Track the last occurrence of each digit
  const lastPos = Array(10).fill(-1);
  for (let i = 0; i < n; i++) {
    lastPos[digits[i]] = i;
  }
  
  // Find the first digit that can be swapped with a larger digit
  for (let i = 0; i < n; i++) {
    // Check if there's a larger digit that appears later
    for (let d = 9; d > digits[i]; d--) {
      if (lastPos[d] > i) {
        // Swap and return
        [digits[i], digits[lastPos[d]]] = [digits[lastPos[d]], digits[i]];
        return Number(digits.join(''));
      }
    }
  }
  
  // No swap needed or possible
  return num;
}
