/**
 * Calculates the number of possible non-empty sequences of letters that can be formed
 * using the given tiles. This implementation uses backtracking with pruning to avoid
 * duplicate sequences.
 *
 * @param {string} tiles - The string of uppercase English letters
 * @return {number} - The number of possible non-empty sequences of letters
 */
function numTilePossibilities(tiles) {
  const tileCount = tiles.length
  let totalSequences = 0

  // Convert tiles to array and sort to handle duplicates efficiently
  const sortedTiles = tiles.split('').sort()

  // Track which tiles have been used in the current exploration path
  const usedTiles = new Array(tileCount).fill(false)

  /**
   * Recursively explore all possible unique sequences using backtracking
   * This approach handles duplicate letters by skipping redundant paths
   */
  function exploreUniqueSequences() {
    // Count this sequence (empty sequence will be subtracted at the end)
    totalSequences++

    // Try each available tile as the next character in the sequence
    for (let i = 0; i < tileCount; i++) {
      // Skip if this tile is already used in the current path
      if (usedTiles[i]) continue

      // Skip duplicate tiles to avoid generating the same sequence
      // Only process the first occurrence of a character at each position
      if (i > 0 && sortedTiles[i] === sortedTiles[i - 1] && !usedTiles[i - 1]) {
        continue
      }

      // Use this tile
      usedTiles[i] = true

      // Recursively explore with this tile added to the sequence
      exploreUniqueSequences()

      // Backtrack: mark this tile as unused for other explorations
      usedTiles[i] = false
    }
  }

  // Start the backtracking process
  exploreUniqueSequences()

  // Subtract 1 to exclude the empty sequence
  return totalSequences - 1
}
