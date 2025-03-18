/**
 * @intuition
 * Find maximum valid subarrays after removing one conflicting pair
 *
 * @approach
 * Process pairs in order of right endpoint, tracking contributions of each pair removal
 *
 * @complexity
 * Time: O(m log m + n), where m is the number of conflicting pairs and n is the array length
 * Space: O(m), for storing results for each pair
 *
 * @param {number} n
 * @param {number[][]} conflictingPairs
 * @return {number}
 */
const maximumSubarrays = (n, conflictingPairs) => {
  const pairCount = conflictingPairs.length
  
  // Normalize pairs so left endpoint is always smaller
  const normalizedPairs = conflictingPairs.map(pair => 
    pair[0] > pair[1] ? [pair[1], pair[0]] : [...pair]
  )
  
  // Sort by right endpoint, then left endpoint
  normalizedPairs.sort((a, b) => a[1] !== b[1] ? a[1] - b[1] : a[0] - b[0])
  
  // Track contributions and base answer
  const pairContributions = Array(pairCount).fill(0)
  let baseSubarrayCount = 0
  
  let pairIndex = 0
  let maxLeftBound = 1
  let currentLeftBound = 1
  let currentPair = -1
  
  // Helper function to update state based on current pair
  const updateState = (leftEndpoint) => {
    if (currentPair === -1) {
      // No active pair yet
      if (maxLeftBound <= leftEndpoint) {
        currentLeftBound = leftEndpoint
        currentPair = pairIndex
      }
      return
    }
    
    if (leftEndpoint < currentLeftBound) {
      // Pair overlaps with current active pair
      maxLeftBound = Math.max(maxLeftBound, leftEndpoint + 1)
      return
    }
    
    if (leftEndpoint === currentLeftBound) {
      // Same left endpoint, can't contribute
      maxLeftBound = currentLeftBound + 1
      currentPair = -1
      return
    }
    
    // New pair becomes active
    maxLeftBound = currentLeftBound + 1
    currentLeftBound = leftEndpoint
    currentPair = pairIndex
  }
  
  // Process all positions from 1 to n
  for (let position = 1; position <= n; position++) {
    // Process all pairs with right endpoint <= current position
    while (pairIndex < pairCount && normalizedPairs[pairIndex][1] <= position) {
      const leftEndpoint = normalizedPairs[pairIndex][0]
      updateState(leftEndpoint)
      pairIndex++
    }
    
    // Add contribution to current pair if applicable
    if (currentPair !== -1) {
      pairContributions[currentPair] += currentLeftBound - maxLeftBound + 1
    }
    
    // Add to base answer
    baseSubarrayCount += currentPair === -1
      ? position - maxLeftBound + 1
      : position - currentLeftBound
  }
  
  // Find maximum contribution from removing a single pair
  const maxPairContribution = Math.max(...pairContributions)
  
  return baseSubarrayCount + maxPairContribution
}
