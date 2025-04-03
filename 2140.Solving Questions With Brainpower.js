/**
 * Dynamic Programming - Bottom-Up Iteration
 * @intuition
 * We need to find the maximum points we can score. For each question, we face a choice: solve it or skip it.
 * Solving question `i` gives `points[i]` but forces us to skip the next `brainpower[i]` questions. Skipping question `i` allows us to consider question `i+1`.
 * This structure suggests dynamic programming. Let `dp[i]` be the maximum points achievable starting from question `i`.
 * The decision at `i` depends on results from future indices (`i+1` and `i + brainpower[i] + 1`). This leads to a bottom-up approach, iterating backward from the last question.
 * @approach
 * 1. Initialize a DP array `dp` of size `n + 1` with all zeros. `dp[i]` will store the maximum points starting from question `i`. `dp[n]` serves as the base case (0 points after the last question).
 * 2. Iterate backward from `i = n - 1` down to `0`.
 * 3. For each question `i`, retrieve its points `p` and brainpower `b`.
 * 4. Calculate the index `nextQuestionIndex` reachable after solving question `i`: `j = i + b + 1`.
 * 5. Determine the points gained by solving question `i`: `pointsFromSolving = p + (j >= n ? 0 : dp[j])`. If `j` is out of bounds, we add 0.
 * 6. Determine the points gained by skipping question `i`: `pointsFromSkipping = dp[i + 1]`.
 * 7. Update `dp[i]` with the maximum of these two choices: `dp[i] = Math.max(pointsFromSkipping, pointsFromSolving)`.
 * 8. The final answer is `dp[0]`, representing the maximum points starting from the first question.
 * @complexity
 * Time: O(n), where n is the number of questions. We iterate through the questions array once.
 * Space: O(n), for the DP array `dp`.
 *
 * @param {number[][]} questions - An array where questions[i] = [points_i, brainpower_i].
 * @returns {number} - The maximum points you can score.
 */
const mostPoints = questions => {
  const n = questions.length
  // dp[i] = max points starting from question i
  const dp = Array(n + 1).fill(0)
  for (let i = n - 1; i >= 0; --i) {
    const [points, brainpower] = questions[i]
    const nextQuestionIndex = i + brainpower + 1
    // Calculate points for skipping vs solving using Math.min for boundary
    dp[i] = Math.max(dp[i + 1], points + dp[Math.min(nextQuestionIndex, n)])
  }
  return dp[0]
}
