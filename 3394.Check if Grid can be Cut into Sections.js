/**
 * Gap Detection - Find valid cuts by identifying gaps between rectangles
 *
 * @intuition We can find valid cuts by sorting rectangles and identifying gaps between them
 *
 * @approach Sort rectangles by their starting coordinates and check for gaps where cuts can be made
 *
 * @complexity
 * Time: O(n log n) where n is the number of rectangles (dominated by sorting)
 * Space: O(1) excluding input and output
 *
 * @param {number} n
 * @param {number[][]} rectangles
 * @return {boolean}
 */
const checkValidCuts = (n, rectangles) => {
  // Check if valid cuts can be made in a specific dimension
  const checkCuts = dim => {
    let gapCount = 0

    // Create a copy of rectangles to avoid modifying the original
    const sortedRects = [...rectangles]

    // Sort rectangles by their starting coordinate in the given dimension
    sortedRects.sort((a, b) => a[dim] - b[dim])

    // Track the furthest ending coordinate seen so far
    let furthestEnd = sortedRects[0][dim + 2]

    for (let i = 1; i < sortedRects.length; i++) {
      const rect = sortedRects[i]

      // If current rectangle starts after the furthest end we've seen,
      // we found a gap where a cut can be made
      if (furthestEnd <= rect[dim]) {
        gapCount++
      }

      // Update the furthest ending coordinate
      furthestEnd = Math.max(furthestEnd, rect[dim + 2])
    }

    // We need at least 2 gaps to create 3 sections
    return gapCount >= 2
  }

  // Try both horizontal (dim=1) and vertical (dim=0) cuts
  return checkCuts(0) || checkCuts(1)
}
