/**
 * @param {number[][]} coordinates
 * @param {number} k
 * @return {number}
 */
const countPairs = (coordinates, k) => {
  let count = 0
  const freq = new Map()

  for (const [x, y] of coordinates) {
    // For each possible value j where j is from 0 to k
    for (let j = 0; j <= k; j++) {
      // Find the complementary point that would give distance k
      const targetX = x ^ j
      const targetY = y ^ (k - j)
      
      // Use a more efficient key format: x * 10^7 + y
      // This avoids string concatenation and parsing
      const targetKey = targetX * 10000001 + targetY
      
      // Add the frequency of the complementary point to our count
      if (freq.has(targetKey)) {
        count += freq.get(targetKey)
      }
    }
    
    // Add current point to frequency map
    const key = x * 10000001 + y
    freq.set(key, (freq.get(key) || 0) + 1)
  }

  return count
}
