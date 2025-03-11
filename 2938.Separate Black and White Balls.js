/**
 * Calculates the minimum number of steps to separate black and white balls
 * 
 * @param {string} s - A binary string where '0' represents white balls and '1' represents black balls
 * @return {number} - The minimum number of adjacent swaps needed to move all white balls to the left
 * 
 * @intuition
 * We need to move all white balls ('0') to the left and all black balls ('1') to the right.
 * Instead of simulating swaps, we can calculate the total distance each black ball needs to travel.
 * 
 * @approach
 * 1. Iterate through the string from right to left
 * 2. Count the number of black balls ('1') encountered
 * 3. For each black ball, calculate how many positions it needs to move to reach its final position
 * 4. The final position of each black ball is determined by its order from the right
 * 
 * @complexity
 * Time complexity: O(n) where n is the length of the string
 * Space complexity: O(1) as we only use a constant amount of extra space
 */
const minimumSteps = (s) => {
  const n = s.length;
  let steps = 0;
  let blackCount = 0;
  
  for (let i = n - 1; i >= 0; --i) {
    if (s[i] === '1') {
      ++blackCount;
      // Each black ball needs to move (n - i - blackCount) steps to the right
      steps += n - i - blackCount;
    }
  }
  
  return steps;
}
