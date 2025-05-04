/**
 * Single-pass approach with segment processing for domino simulation
 *
 * @intuition
 * We can process the dominoes by identifying segments of consecutive dots
 * and determining how they fall based on the forces at each end of the segment.
 *
 * @approach
 * 1. Iterate through the string once, identifying segments of consecutive dots
 * 2. For each segment, determine how it falls based on the forces at each end:
 *    - If both ends are the same (L...L or R...R), all dominoes fall in that direction
 *    - If the segment is R...L, dominoes fall toward the middle
 *    - If the segment is L...R, dominoes remain standing
 * 3. Handle edge cases by treating the ends of the string appropriately
 *
 * @complexity
 * Time: O(n) where n is the length of the dominoes string
 * Space: O(n) for the result string
 *
 * @param {string} dominoes - A string representing the initial state of dominoes
 * @return {string} - The final state after all dominoes fall
 */
const pushDominoes = (dominoes) => {
  if (!dominoes || !dominoes.length) {
    return ''
  }

  const len = dominoes.length
  let l = -1 // Start index of current dot segment
  let head = 'L' // Force before current segment (default left for beginning)
  let ans = ''

  // Process each character plus one extra iteration for final segment
  for (let i = 0; i <= len; i++) {
    const c = i < len ? dominoes[i] : 'R' // Use 'R' as sentinel at the end

    if (c === '.') {
      // Track the start of a dot segment
      if (l === -1) {
        l = i
      }
    } else {
      // Process a dot segment when we hit a non-dot
      if (l !== -1) {
        const r = i - 1 // End index of dot segment
        const count = r - l + 1 // Length of dot segment

        if (head === 'L' && c === 'L') {
          // L...L: All dominoes fall left
          ans += 'L'.repeat(count)
        } else if (head === 'R' && c === 'R') {
          // R...R: All dominoes fall right
          ans += 'R'.repeat(count)
        } else if (head === 'L' && c === 'R') {
          // L...R: No force, dominoes stay standing
          ans += '.'.repeat(count)
        } else {
          // head === 'R' && c === 'L'
          // R...L: Forces meet in middle
          ans += 'R'.repeat(Math.floor(count / 2))
          if (count % 2 === 1) {
            // Middle domino stays standing if count is odd
            ans += '.'
          }
          ans += 'L'.repeat(Math.floor(count / 2))
        }
        l = -1 // Reset dot segment tracker
      }

      // Add the current non-dot character to result
      if (i < len) {
        ans += c
      }
      head = c // Update the force for next segment
    }
  }

  return ans
}
