/**
 * @param {number[]} days - Days of travel in strictly increasing order (1 to 365)
 * @param {number[]} costs - Costs of passes [1-day, 7-day, 30-day]
 * @return {number} - Minimum cost to cover all travel days
 *
 * @description
 * This solution uses dynamic programming to find the minimum cost for tickets.
 * We create a DP array where dp[i] represents the minimum cost to cover all travel days from day i to the end.
 * For each travel day, we consider buying a 1-day, 7-day, or 30-day pass and choose the minimum cost option.
 *
 * Time Complexity: O(n), where n is the number of travel days
 * Space Complexity: O(n) for the dp array
 */
const mincostTickets = (days, costs) => {
  const n = days.length
  // dp[i] represents minimum cost to travel from day i to the end
  const dp = new Array(n + 1).fill(0)

  // Start from the last day and work backwards
  for (let i = n - 1; i >= 0; i--) {
    // Option 1: Buy a 1-day pass for the current day
    const option1 = costs[0] + dp[i + 1]

    // Option 2: Buy a 7-day pass covering the current day
    // Find the first day not covered by this pass
    let j = i
    while (j < n && days[j] < days[i] + 7) {
      j++
    }
    const option2 = costs[1] + dp[j]

    // Option 3: Buy a 30-day pass covering the current day
    // Find the first day not covered by this pass
    j = i
    while (j < n && days[j] < days[i] + 30) {
      j++
    }
    const option3 = costs[2] + dp[j]

    // Choose the minimum cost option
    dp[i] = Math.min(option1, option2, option3)
  }

  // dp[0] contains the minimum cost to cover all travel days
  return dp[0]
}
