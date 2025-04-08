/**
 * @minimax - Optimal play with memoization
 * 
 * @intuition
 * This is a zero-sum game where each player tries to maximize their score difference.
 * At each step, a player can take 1, 2, or 3 stones and wants to maximize their advantage.
 * Using minimax with memoization, we can determine the optimal play for both players.
 * 
 * @approach
 * 1. Use top-down dynamic programming (memoization) to calculate the maximum score difference
 * 2. For each position, try taking 1, 2, or 3 stones and choose the option that maximizes advantage
 * 3. The score difference represents Alice's advantage over Bob
 * 4. Return the winner based on the final score difference
 * 
 * @complexity
 * Time complexity: O(n), where n is the length of stoneValue array
 * Space complexity: O(n) for the memoization array
 * 
 * @param {number[]} stoneValue - Array of stone values
 * @return {string} - The winner: 'Alice', 'Bob', or 'Tie'
 */
const stoneGameIII = (stoneValue) => {
  const n = stoneValue.length;
  const memo = Array(n).fill(null);
  
  /**
   * Calculate the maximum score difference starting from position i
   * @param {number} i - Current position in the array
   * @return {number} - Maximum score difference (positive means Alice wins)
   */
  const getMaxDiff = (i) => {
    // Base case: no more stones
    if (i >= n) return 0;
    
    // Return memoized result if available
    if (memo[i] !== null) return memo[i];
    
    // Initialize with worst possible score
    let maxDiff = -Infinity;
    let sum = 0;
    
    // Try taking 1, 2, or 3 stones
    for (let j = 0; j < 3 && i + j < n; j++) {
      sum += stoneValue[i + j];
      // Current sum minus opponent's best play
      maxDiff = Math.max(maxDiff, sum - getMaxDiff(i + j + 1));
    }
    
    // Memoize and return
    memo[i] = maxDiff;
    return maxDiff;
  };
  
  const scoreDiff = getMaxDiff(0);
  
  // Determine winner based on score difference
  if (scoreDiff > 0) return 'Alice';
  if (scoreDiff < 0) return 'Bob';
  return 'Tie';
};
