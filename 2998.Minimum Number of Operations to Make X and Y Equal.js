/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
const minimumOperationsToMakeEqual = (x, y) => {
  // If x is already equal to y, no operations needed
  if (x === y) {
    return 0
  }

  // If x is less than y, we can only increment x
  if (x < y) {
    return y - x
  }

  // Use BFS to find the minimum number of operations
  const queue = [[x, 0]] // [value, operations]
  const visited = new Set([x])

  while (queue.length > 0) {
    const [current, ops] = queue.shift()

    // Try all possible operations
    const nextStates = [
      current - 1, // Decrement by 1
      current + 1, // Increment by 1
    ]

    // Add division operations if applicable
    if (current % 5 === 0) {
      nextStates.push(current / 5)
    }
    if (current % 11 === 0) {
      nextStates.push(current / 11)
    }

    for (const next of nextStates) {
      if (next === y) {
        return ops + 1 // Found the target
      }

      if (!visited.has(next) && next > 0) {
        visited.add(next)
        queue.push([next, ops + 1])
      }
    }
  }

  return -1 // Should not reach here given the constraints
}
