/**
 * Hash map counting approach
 * 
 * @intuition
 * Two dominoes are equivalent if they have the same values in the same or reversed order.
 * We can create a unique key for each domino by ensuring the smaller value is always first.
 * Then count occurrences of each unique domino and calculate pairs using combination formula.
 * 
 * @approach
 * 1. Create a frequency map for each unique domino representation
 * 2. For each domino [a,b], use key = min(a,b)*10 + max(a,b) to normalize orientation
 * 3. Count occurrences of each normalized domino in the map
 * 4. For each count n in the map, add n*(n-1)/2 to the result (combination formula)
 * 
 * @complexity
 * Time complexity: O(n) where n is the number of dominoes
 * Space complexity: O(1) as there are at most 9*9=81 possible unique dominoes
 * 
 * @param {number[][]} dominoes - Array of domino pairs
 * @return {number} - Number of equivalent domino pairs
 */
const numEquivDominoPairs = dominoes => {
  const freqMap = {}
  let pairCount = 0
  
  for (const [a, b] of dominoes) {
    // Create a unique key for each domino, ensuring the smaller value is always first
    const key = a <= b ? a * 10 + b : b * 10 + a
    
    // If we've seen this domino before, add the current count to our pairs
    // This counts all new pairs formed with previously seen equivalent dominoes
    if (freqMap[key]) {
      pairCount += freqMap[key]
      freqMap[key]++
    } else {
      freqMap[key] = 1
    }
  }
  
  return pairCount
}
