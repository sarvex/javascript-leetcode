/**
 * Find the number of distinct colors among the balls
 *
 * After each query [ball, color], we color a ball at index 'ball' with 'color'
 * and return the number of different colors present among all balls.
 *
 * @param {number} limit - The number of balls (not used in the implementation)
 * @param {number[][]} queries - Array of [ball, color] queries
 * @return {number[]} The number of distinct colors after each query
 */
const queryResults = (limit, queries) => {
  // Map to track which ball has which color
  const ballColorMap = new Map()
  
  // Map to track the count of each color
  const colorCountMap = new Map()
  
  // Array to store results after each query
  const results = []

  for (const [ballIndex, newColor] of queries) {
    // If the ball already had a color, update the color counts
    if (ballColorMap.has(ballIndex)) {
      const oldColor = ballColorMap.get(ballIndex)
      
      // Decrement the count of the old color
      colorCountMap.set(oldColor, colorCountMap.get(oldColor) - 1)
      
      // If no balls have this color anymore, remove it from the count map
      if (!colorCountMap.get(oldColor)) {
        colorCountMap.delete(oldColor)
      }
    }
    
    // Update the ball's color
    ballColorMap.set(ballIndex, newColor)
    
    // Increment the count of the new color
    colorCountMap.set(newColor, (colorCountMap.get(newColor) || 0) + 1)
    
    // Add the current number of distinct colors to results
    results.push(colorCountMap.size)
  }
  
  return results
}
