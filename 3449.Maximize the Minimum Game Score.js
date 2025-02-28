/**
 * Maximizes the minimum value in the gameScore array after at most m moves.
 *
 * This solution uses a binary search approach to find the maximum possible
 * minimum score. For each potential target score, we check if it's achievable
 * with at most m moves using a greedy algorithm.
 *
 * @param {number[]} points - Array of points that can be added to gameScore
 * @param {number} m - Maximum number of moves allowed
 * @return {number} - Maximum possible minimum value in gameScore
 */
const maxScore = (points, m) => {
  const n = points.length

  // If we don't have enough moves to visit all positions, return 0
  if (m < n) {
    return 0
  }

  /**
   * Checks if it's possible to achieve a minimum score of 'target' with at most 'm' moves.
   * This implements the logic from the C++ solution's 'possible' function.
   *
   * @param {number} target - Target minimum score to achieve
   * @param {number[]} points - Array of points
   * @param {number} m - Maximum number of moves allowed
   * @return {boolean} - Whether the target is achievable
   */
  const possible = (target, points, m) => {
    let moves = 0
    let extra = 0
    let bonus = 0

    for (const p of points) {
      // Calculate required visits to reach target
      const required = Math.ceil(target / p)

      if (extra >= required) {
        // We have enough extra moves
        extra = 0
        bonus++
      } else {
        // We need more moves
        const diff = required - extra
        moves += 2 * diff - 1 + bonus
        extra = diff - 1
        bonus = 0
      }

      if (moves > m) return false
    }

    return true
  }

  // Binary search to find the maximum possible minimum score
  let left = 1
  let right = 1e18
  let answer = 0

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2)

    if (possible(mid, points, m)) {
      answer = mid
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return answer
}
