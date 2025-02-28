/**
 * Calculates the maximum Manhattan distance after making at most k changes to the direction string.
 * This optimized approach directly tracks coordinates and calculates the maximum possible distance
 * considering the k changes available.
 *
 * @param {string} s - The string representing directions ('N', 'S', 'E', 'W')
 * @param {number} k - Maximum number of direction changes allowed
 * @return {number} - Maximum possible Manhattan distance after k changes
 */
const maxDistance = (s, k) => {
  let ans = 0 // Maximum Manhattan distance found
  let x = 0 // Current x-coordinate
  let y = 0 // Current y-coordinate

  for (let i = 0; i < s.length; i++) {
    // Update coordinates based on the current direction
    if (s[i] === 'N') y++
    else if (s[i] === 'S') y--
    else if (s[i] === 'E') x++
    else x-- // 'W' direction

    // Calculate the maximum possible distance:
    // 1. Current Manhattan distance: |x| + |y|
    // 2. Each change can contribute +2 to distance (by flipping a direction)
    // 3. We can't make more changes than steps we've taken (i + 1)
    ans = Math.max(ans, Math.min(Math.abs(x) + Math.abs(y) + k * 2, i + 1))
  }

  return ans
}
