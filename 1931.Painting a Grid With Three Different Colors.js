/**
 * Dynamic Programming with State Encoding
 *
 * @intuition
 * We need to count valid colorings of an m×n grid where adjacent cells have different colors.
 * The key insight is to encode each column as a state (represented as a number) and build
 * relationships between valid column states.
 *
 * @approach
 * 1. Encode each column as a base-3 number (for 3 colors)
 * 2. Find all valid column states (no adjacent same colors within a column)
 * 3. Build a graph of compatible adjacent columns (no same colors in adjacent positions)
 * 4. Use DP to count valid colorings by transitioning between states
 *
 * @complexity
 * Time: O(3^m * 3^m * n) where checking valid states is O(3^m), building transitions is O(3^m * 3^m), and DP iteration is O(3^m * n)
 * Space: O(3^m) for storing valid states and DP arrays
 */
const colorTheGrid = (m, n) => {
  // Check if a column state is valid (no adjacent same colors)
  const isValidColumn = (x) => {
    let last = -1
    for (let i = 0; i < m; i++) {
      const color = x % 3
      if (color === last) {
        return false
      }
      last = color
      x = Math.floor(x / 3)
    }
    return true
  }

  // Check if two adjacent columns are compatible
  const areColumnsCompatible = (x, y) => {
    for (let i = 0; i < m; i++) {
      if (x % 3 === y % 3) {
        return false
      }
      x = Math.floor(x / 3)
      y = Math.floor(y / 3)
    }
    return true
  }

  const MOD = 1e9 + 7
  const maxState = 3 ** m

  // Find all valid column states
  const validStates = new Set()
  const dp = Array(maxState).fill(0)

  for (let i = 0; i < maxState; i++) {
    if (isValidColumn(i)) {
      validStates.add(i)
      dp[i] = 1 // Initialize with 1 valid way for the first column
    }
  }

  // Build transition graph between valid states
  const transitions = new Map()
  for (const state1 of validStates) {
    const validNextStates = []
    for (const state2 of validStates) {
      if (areColumnsCompatible(state1, state2)) {
        validNextStates.push(state2)
      }
    }
    transitions.set(state1, validNextStates)
  }

  // DP iteration for each column
  for (let col = 1; col < n; col++) {
    const nextDp = Array(maxState).fill(0)

    for (const currentState of validStates) {
      for (const nextState of transitions.get(currentState)) {
        nextDp[currentState] = (nextDp[currentState] + dp[nextState]) % MOD
      }
    }

    // Update DP array for next iteration
    for (let i = 0; i < maxState; i++) {
      dp[i] = nextDp[i]
    }
  }

  // Sum all valid ways
  return Array.from(validStates).reduce((sum, state) => (sum + dp[state]) % MOD, 0)
}
