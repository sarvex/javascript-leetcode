/**
 * Direct rotation counting approach
 *
 * @intuition
 * If all dominoes can show the same value after rotations, that value must be
 * present in either the top or bottom of the first domino. We can check both
 * possibilities and find the minimum rotations needed.
 *
 * @approach
 * 1. Try to make all dominoes show the value of tops[0] or bottoms[0]
 * 2. For each target value, count minimum rotations by tracking:
 *    - toTop: rotations needed to get target on top row
 *    - toBottom: rotations needed to get target on bottom row
 * 3. Return the minimum of all possible rotation counts
 * 4. If no valid solution exists, return -1
 *
 * @complexity
 * Time complexity: O(n) where n is the length of the arrays
 * Space complexity: O(1) using constant extra space
 *
 * @param {number[]} tops - The values on the top side of dominoes
 * @param {number[]} bottoms - The values on the bottom side of dominoes
 * @return {number} - Minimum number of rotations or -1 if impossible
 */
const minDominoRotations = (tops, bottoms) => {
  // Helper function to calculate minimum rotations for a target value
  const minRotations = (target) => {
    let toTop = 0 // Count rotations needed to make all tops = target
    let toBottom = 0 // Count rotations needed to make all bottoms = target

    for (let i = 0; i < tops.length; i++) {
      // If neither side has the target value, it's impossible
      if (tops[i] !== target && bottoms[i] !== target) {
        return Infinity // Impossible marker
      }

      // Count rotations needed for each strategy
      if (tops[i] !== target) {
        toTop++ // Need to rotate bottom value to top
      } else if (bottoms[i] !== target) {
        toBottom++ // Need to rotate top value to bottom
      }
      // If both sides have target, no rotation needed for this position
    }

    // Return minimum of the two rotation strategies
    return Math.min(toTop, toBottom)
  }

  // Try both possible values from the first domino
  const result = Math.min(minRotations(tops[0]), minRotations(bottoms[0]))

  // If result is valid, return it; otherwise return -1
  return result === Infinity ? -1 : result
}
