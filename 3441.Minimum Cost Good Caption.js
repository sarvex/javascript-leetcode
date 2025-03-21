/**
 * @param {string} caption
 * @return {string}
 * @intuition
 * Convert caption into groups of at least 3 consecutive identical characters with minimum cost.
 * Each character can be changed to adjacent characters in the alphabet with cost = absolute difference.
 *
 * @approach
 * For each possible grouping pattern, find the optimal character for each group to minimize cost.
 * A grouping pattern is a way to divide the caption into groups of size ≥3.
 *
 * @complexity
 * Time: O(n²) where n is caption length
 * Space: O(n) for storing patterns and result
 */
const minCostGoodCaption = caption => {
  const n = caption.length
  if (n < 3) return ''
  
  // Find all valid ways to divide the caption into groups of size ≥3
  const findPatterns = len => {
    const result = []
    
    const backtrack = (start, current) => {
      if (start === len) {
        result.push([...current])
        return
      }
      
      for (let size = 3; start + size <= len; size++) {
        current.push(size)
        backtrack(start + size, current)
        current.pop()
      }
    }
    
    backtrack(0, [])
    return result
  }
  
  // Calculate cost to convert a segment to a specific character
  const calculateCost = (segment, char) => {
    const charCode = char.charCodeAt(0)
    return segment.split('').reduce((cost, c) => 
      cost + (c === char ? 0 : Math.abs(c.charCodeAt(0) - charCode)), 0)
  }
  
  // Find the best character for a segment
  const findBestChar = segment => {
    let bestChar = 'a'
    let minCost = Infinity
    
    for (let code = 97; code <= 122; code++) {
      const char = String.fromCharCode(code)
      const cost = calculateCost(segment, char)
      
      if (cost < minCost || (cost === minCost && char < bestChar)) {
        minCost = cost
        bestChar = char
      }
    }
    
    return [bestChar, minCost]
  }
  
  // Evaluate a pattern
  const evaluatePattern = pattern => {
    let totalCost = 0
    let result = ''
    let pos = 0
    
    for (const size of pattern) {
      const segment = caption.substring(pos, pos + size)
      const [char, cost] = findBestChar(segment)
      
      totalCost += cost
      result += char.repeat(size)
      pos += size
    }
    
    return [result, totalCost]
  }
  
  // Find the best pattern
  const patterns = findPatterns(n)
  let bestResult = ''
  let minCost = Infinity
  
  for (const pattern of patterns) {
    const [result, cost] = evaluatePattern(pattern)
    
    if (cost < minCost || (cost === minCost && result < bestResult)) {
      minCost = cost
      bestResult = result
    }
  }
  
  return bestResult
}

module.exports = minCostGoodCaption
