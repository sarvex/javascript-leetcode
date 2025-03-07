/**
 * @param {number[][]} board - The 2x3 puzzle board representation
 * @return {number} - The minimum number of moves to solve the puzzle, or -1 if impossible
 *
 * Time Complexity: O(N!), where N is the number of tiles (6 in this case)
 * Space Complexity: O(N!) for storing all visited states
 */
const slidingPuzzle = (board) => {
  // Initialize with flattened board and move counter
  let moves = 0
  const queue = [board[0].concat(board[1])]

  // Track visited states
  const seen = new Set([queue[0].join('')])

  // Check if already solved
  if (seen.has('123450')) return 0

  // Possible adjacent positions for each index in the 2x3 grid
  const adjacentPositions = [
    [1, 3],       // Position 0
    [0, 2, 4],    // Position 1
    [1, 5],       // Position 2
    [0, 4],       // Position 3
    [1, 3, 5],    // Position 4
    [2, 4]        // Position 5
  ]

  // BFS level by level
  while (queue.length) {
    // Process all states at current level
    const nextLevel = []

    for (const element of queue) {
      const currentState = element
      const zeroIndex = currentState.indexOf(0)

      // Try all possible moves
      for (const nextIndex of adjacentPositions[zeroIndex]) {
        // Create new state with swapped positions
        const nextState = [...currentState]
        nextState[zeroIndex] = nextState[nextIndex]
        nextState[nextIndex] = 0

        const stateKey = nextState.join('')

        // Check if solved
        if (stateKey === '123450') return moves + 1

        // Add to next level if not seen before
        if (!seen.has(stateKey)) {
          seen.add(stateKey)
          nextLevel.push(nextState)
        }
      }
    }

    // Move to next level
    moves++
    queue.length = 0
    queue.push(...nextLevel)
  }

  return -1
}
