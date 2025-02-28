const separateSquares = (squares) => {
  // Check for empty input
  if (!squares || squares.length === 0) return 0

  // Special case: If all squares have the same y-coordinate and height
  // We can solve it more efficiently
  const sampleY = squares[0][1]
  const sampleL = squares[0][2]
  let allSameYAndL = true

  for (let i = 1; i < squares.length; i++) {
    if (squares[i][1] !== sampleY || squares[i][2] !== sampleL) {
      allSameYAndL = false
      break
    }
  }

  if (allSameYAndL) {
    // If all squares have the same y and length, the answer is simple:
    // The halfway point will be exactly at y + length/2
    return sampleY + sampleL / 2
  }

  // For the general case, use the efficient line sweep algorithm
  // Create events for each square's bottom and top edges
  const events = []

  for (const [x, y, l] of squares) {
    events.push([y, 0, x, x + l]) // Bottom edge (start)
    events.push([y + l, 1, x, x + l]) // Top edge (end)
  }

  // Sort events by y-coordinate
  events.sort((a, b) => a[0] - b[0])

  // Collect unique x-coordinates in a more memory-efficient way
  const xSet = new Set()
  for (const [x, , l] of squares) {
    xSet.add(x)
    xSet.add(x + l)
  }
  const sortedX = [...xSet].sort((a, b) => a - b)

  // Create mapping from x-coordinate to index for faster lookups
  const xToIndex = new Map()
  for (let i = 0; i < sortedX.length; i++) {
    xToIndex.set(sortedX[i], i)
  }

  const n = sortedX.length
  const intervals = new Array(n - 1).fill(0)

  // Calculate width lookup for quick access
  const widths = new Array(n - 1)
  for (let i = 0; i < n - 1; i++) {
    widths[i] = sortedX[i + 1] - sortedX[i]
  }

  // First pass: calculate total area more efficiently
  let totalArea = 0
  let prevY = events[0][0]
  let activeWidth = 0

  for (const [y, type, left, right] of events) {
    // Add area between current and previous y-coordinate
    if (y > prevY) {
      totalArea += activeWidth * (y - prevY)
    }

    // Get indices efficiently using the map
    const leftIndex = xToIndex.get(left)
    const rightIndex = xToIndex.get(right)

    // Update intervals and active width
    for (let i = leftIndex; i < rightIndex; i++) {
      const wasActive = intervals[i] > 0
      intervals[i] += type === 0 ? 1 : -1
      const isActive = intervals[i] > 0

      if (!wasActive && isActive) {
        activeWidth += widths[i]
      } else if (wasActive && !isActive) {
        activeWidth -= widths[i]
      }
    }

    prevY = y
  }

  // Reset for second pass
  intervals.fill(0)
  let currentArea = 0
  prevY = events[0][0]
  activeWidth = 0

  // Second pass: find the y-coordinate where area is split equally
  const halfTotalArea = totalArea / 2

  for (const [y, type, left, right] of events) {
    // Calculate area between current and previous y-coordinate
    if (y > prevY) {
      const segmentArea = activeWidth * (y - prevY)

      // Check if adding this area exceeds half the total
      if (currentArea + segmentArea >= halfTotalArea) {
        // Calculate the exact y-coordinate
        if (activeWidth > 0) {
          const neededArea = halfTotalArea - currentArea
          return prevY + neededArea / activeWidth
        }
        return prevY
      }

      currentArea += segmentArea
    }

    // Get indices efficiently using the map
    const leftIndex = xToIndex.get(left)
    const rightIndex = xToIndex.get(right)

    // Update intervals and active width
    for (let i = leftIndex; i < rightIndex; i++) {
      const wasActive = intervals[i] > 0
      intervals[i] += type === 0 ? 1 : -1
      const isActive = intervals[i] > 0

      if (!wasActive && isActive) {
        activeWidth += widths[i]
      } else if (wasActive && !isActive) {
        activeWidth -= widths[i]
      }
    }

    prevY = y
  }

  return events[events.length - 1][0]
}
