/**
 * @param {string} s
 * @return {number}
 */
const maximumLength = (s) => {
  // For each character and length, store the count of special substrings
  const counts = new Map()
  
  // Process runs of the same character
  let start = 0
  for (let i = 1; i <= s.length; i++) {
    if (i === s.length || s[i] !== s[start]) {
      const char = s[start]
      const length = i - start
      
      // For each possible length of substring
      for (let len = 1; len <= length; len++) {
        const key = char + len // Use character + length as key
        counts.set(key, (counts.get(key) || 0) + (length - len + 1))
      }
      
      start = i
    }
  }
  
  // Find the maximum length that occurs at least 3 times
  let result = -1
  for (const [key, count] of counts.entries()) {
    if (count >= 3) {
      const len = parseInt(key.slice(1)) // Extract length from key
      result = Math.max(result, len)
    }
  }
  
  return result
}
