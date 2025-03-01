/**
 * Determines if two strings can be made equal with at most one swap operation.
 * 
 * A swap operation is defined as taking two indices i and j (0-indexed) 
 * and swapping s1[i] with s1[j].
 * 
 * @param {string} s1 - First input string
 * @param {string} s2 - Second input string
 * @return {boolean} - True if strings can be made equal with at most one swap
 */
const areAlmostEqual = (s1, s2) => {
  // Track positions where characters differ between strings
  const mismatchPositions = []
  
  // Identify all positions where characters don't match
  for (let i = 0; i < s1.length; i++) {
    if (s1.at(i) !== s2.at(i)) {
      mismatchPositions.push(i)
    }
  }

  // If no mismatches, strings are already equal
  if (mismatchPositions.length === 0) return true
  
  // Strings can be made equal with one swap if:
  // 1. Exactly two positions differ
  // 2. Swapping these positions in s1 would match s2
  return (
    mismatchPositions.length === 2 && 
    s1.at(mismatchPositions[0]) === s2.at(mismatchPositions[1]) && 
    s1.at(mismatchPositions[1]) === s2.at(mismatchPositions[0])
  )
}
