/**
 * @param {number} n - The number of teams (0 to n-1)
 * @param {number[][]} edges - Array of [winner, loser] pairs where winner defeated loser
 * @return {number} - The champion team index or -1 if no champion exists
 *
 * Time Complexity: O(n + m) where n is the number of teams and m is the number of edges
 * Space Complexity: O(n)
 */
const findChampion = (n, edges) => {
  const defeatedCount = Array(n).fill(0)

  edges.forEach(([, loser]) => {
    defeatedCount[loser]++
  })

  let championCandidate = -1
  let undefeatedCount = 0

  for (let team = 0; team < n; team++) {
    if (defeatedCount[team] === 0) {
      undefeatedCount++
      championCandidate = team
    }
  }

  return undefeatedCount === 1 ? championCandidate : -1
}
