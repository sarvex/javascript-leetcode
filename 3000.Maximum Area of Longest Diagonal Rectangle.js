/**
 * @param {number[][]} dimensions
 * @return {number}
 */
const areaOfMaxDiagonal = (dimensions) => 
  dimensions.reduce((result, [length, width]) => {
    const diagonalSquared = length * length + width * width
    const area = length * width
    
    if (diagonalSquared > result.maxDiag) {
      return { maxDiag: diagonalSquared, maxArea: area }
    } else if (diagonalSquared === result.maxDiag && area > result.maxArea) {
      return { maxDiag: result.maxDiag, maxArea: area }
    }
    return result
  }, { maxDiag: 0, maxArea: 0 }).maxArea
