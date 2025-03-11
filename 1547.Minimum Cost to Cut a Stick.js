/**
 * Calculates the minimum cost to cut a stick into pieces
 * 
 * @intuition
 * The cost of each cut depends on the current length of the stick segment being cut.
 * This is a classic dynamic programming problem where the order of cuts affects the total cost.
 * By processing cuts in a specific order, we can optimize the solution.
 * 
 * @approach
 * 1. Add 0 and n to the cuts array to represent the endpoints of the stick
 * 2. Sort the cuts array to process cuts in order
 * 3. Use dynamic programming with a 2D array where dp[i][j] represents the minimum cost to cut
 *    the stick between the ith and jth cut positions (not including endpoints)
 * 4. Process subproblems in a bottom-up manner, starting from smaller segments
 * 5. For each segment, try all possible cuts and choose the one with minimum cost
 * 6. The cost includes the length of the current segment (cuts[end+1] - cuts[start-1])
 * 
 * @complexity
 * Time complexity: O(n³) where n is the number of cuts
 * Space complexity: O(n²) for the DP table
 * 
 * @param {number} n - The length of the stick
 * @param {number[]} cuts - Array of positions where cuts should be made
 * @return {number} - The minimum total cost to cut the stick
 */
const minCost = (n, cuts) => {
  cuts.push(0, n);
  cuts.sort((a, b) => a - b);
  
  const dp = Array.from({ length: cuts.length }, () => Array(cuts.length).fill(0));
  
  for (let start = cuts.length - 2; start >= 1; start--) {
    for (let end = 1; end <= cuts.length - 2; end++) {
      if (start > end) continue;
      
      let minCost = Number.MAX_SAFE_INTEGER;
      const segmentLength = cuts[end + 1] - cuts[start - 1];
      
      for (let i = start; i <= end; i++) {
        const leftCost = dp[start][i - 1];
        const rightCost = dp[i + 1][end];
        const totalCost = segmentLength + leftCost + rightCost;
        
        minCost = Math.min(minCost, totalCost);
      }
      
      dp[start][end] = minCost;
    }
  }
  
  return dp[1][cuts.length - 2];
};
