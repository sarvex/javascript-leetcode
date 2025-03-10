/**
 * Finds the longest square streak in an array.
 * A square streak is a sequence of integers [a1, a2, ..., an] such that:
 * - For all i (1 < i <= n): ai = ai-1 * ai-1
 * - n >= 2 (the sequence contains at least two integers)
 * 
 * @param {number[]} nums - An array of positive integers
 * @returns {number} The length of the longest square streak in nums, or -1 if no square streak exists
 * @complexity Time: O(n), where n is the length of the input array
 * @complexity Space: O(n), for storing unique numbers and memoization cache
 */
const longestSquareStreak = (nums) => {
  // Identify all numbers that are perfect squares and store their roots
  const roots = new Set()
  
  // Create a set of all numbers for O(1) lookups
  const numSet = new Set(nums)
  
  // Find all numbers that are perfect squares and add their roots to the set
  for (const num of numSet) {
    const root = Math.sqrt(num)
    if (Number.isInteger(root)) {
      roots.add(root)
    }
  }
  
  // Memoization cache to avoid recalculating sequence lengths
  const seqLengthCache = {}
  
  /**
   * Recursively calculate the length of a square streak starting from a number
   * Uses memoization to avoid redundant calculations
   * 
   * @param {number} num - The starting number of the sequence
   * @returns {number} - The length of the sequence
   */
  const calculateSequenceLength = (num) => {
    // Return cached result if available
    if (seqLengthCache[num] !== undefined) {
      return seqLengthCache[num]
    }
    
    // If the square of this number is not in our set, sequence length is 1
    if (!numSet.has(num * num)) {
      seqLengthCache[num] = 1
      return 1
    }
    
    // Recursively calculate length: 1 + length of sequence starting from num²
    const length = 1 + calculateSequenceLength(num * num)
    seqLengthCache[num] = length
    return length
  }
  
  // Find the longest streak
  let longestStreak = -1
  
  // Only check numbers that could potentially continue a streak
  for (const num of numSet) {
    // Skip numbers that aren't part of a streak (not a square root of another number)
    if (roots.has(num)) {
      const streakLength = calculateSequenceLength(num)
      
      // Only consider valid streaks (length >= 2)
      if (streakLength >= 2) {
        longestStreak = Math.max(longestStreak, streakLength)
      }
    }
  }
  
  return longestStreak
}
