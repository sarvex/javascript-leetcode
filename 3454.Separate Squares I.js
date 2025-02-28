/**
 * @param {number[][]} squares - Array of squares where each square is [x, y, l]
 * @return {number} - The minimum y-coordinate value that divides the squares into equal areas
 */
const separateSquares = (squares) => {
  const calculateAreaDifference = (horizontalLine, squares) => {
    let areaAbove = 0
    let areaBelow = 0
    const squareCount = squares.length

    for (let i = 0; i < squareCount; i++) {
      const yPosition = squares[i][1]
      const sideLength = squares[i][2]
      const squareArea = sideLength * sideLength

      if (horizontalLine <= yPosition) {
        // Square is completely above the line
        areaAbove += squareArea
      } else if (horizontalLine >= yPosition + sideLength) {
        // Square is completely below the line
        areaBelow += squareArea
      } else {
        // Square is intersected by the line
        const heightAbove = yPosition + sideLength - horizontalLine
        const heightBelow = horizontalLine - yPosition
        areaAbove += sideLength * heightAbove
        areaBelow += sideLength * heightBelow
      }
    }

    return areaAbove - areaBelow
  }

  // Binary search to find the dividing line
  let lowerBound = 0
  let upperBound = 2e9
  const iterationCount = 60 // Provides sufficient precision

  for (let i = 0; i < iterationCount; i++) {
    const midPoint = (lowerBound + upperBound) / 2.0
    const areaDifference = calculateAreaDifference(midPoint, squares)

    if (areaDifference > 0) {
      lowerBound = midPoint // The line needs to be higher
    } else {
      upperBound = midPoint // The line needs to be lower
    }
  }

  return upperBound
}
