/**
 * @param {number[][]} grid
 * @return {number}
 */
const lenOfVDiagonal = (grid) => {
  const n = grid.length
  const m = grid[0].length

  // Define the four diagonal directions
  // [row change, column change]
  const directions = [
    [-1, 1], // top-right
    [1, 1], // bottom-right
    [1, -1], // bottom-left
    [-1, -1], // top-left
  ]

  // Function to check if a cell is within the grid bounds
  const isValid = (i, j) => i >= 0 && i < n && j >= 0 && j < m

  // Function to check if the value at the current position follows the sequence
  const followsSequence = (val, step) => {
    if (step === 0) return val === 1
    return step % 2 === 1 ? val === 2 : val === 0
  }

  let maxLength = 0

  // Iterate through each cell in the grid
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      // Skip if the starting value is not 1
      if (grid[i][j] !== 1) continue

      // Try each direction as the starting direction
      for (let dirIdx = 0; dirIdx < 4; dirIdx++) {
        const [di, dj] = directions[dirIdx]
        let row = i,
          col = j
        let step = 0
        let length = 1 // Start with length 1 (the starting cell)
        let turned = false

        // Continue in the current direction
        while (true) {
          step++
          row += di
          col += dj

          // Check if the next cell is valid and follows the sequence
          if (!isValid(row, col) || !followsSequence(grid[row][col], step)) {
            break
          }

          length++

          // If we haven't made a turn yet, try to make a 90-degree turn
          if (!turned) {
            // Try all possible 90-degree turns (clockwise)
            const nextDirIdx = (dirIdx + 1) % 4
            const [newDi, newDj] = directions[nextDirIdx]
            let newRow = row + newDi
            let newCol = col + newDj

            // Check if the turn is valid and follows the sequence
            if (isValid(newRow, newCol) && followsSequence(grid[newRow][newCol], step + 1)) {
              // Save the current state
              const currentRow = row
              const currentCol = col
              const currentStep = step
              const currentLength = length

              // Make the turn
              row = newRow
              col = newCol
              step++
              length++
              turned = true

              // Continue in the new direction
              while (true) {
                step++
                row += newDi
                col += newDj

                if (!isValid(row, col) || !followsSequence(grid[row][col], step)) {
                  break
                }

                length++
              }

              // Update max length
              maxLength = Math.max(maxLength, length)

              // Restore the state to continue in the original direction
              row = currentRow
              col = currentCol
              step = currentStep
              length = currentLength
              turned = false
            }
          }
        }

        // Update max length for the straight path
        maxLength = Math.max(maxLength, length)
      }
    }
  }

  return maxLength
}
