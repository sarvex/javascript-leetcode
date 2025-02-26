/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minOrAfterOperations = (nums, k) => {
  const n = nums.length
  let result = 0
  
  // Pre-compute the all-ones mask once
  const allOnes = (1 << 30) - 1
  
  for (let bitPosition = 30; bitPosition >= 0; bitPosition--) {
    // Pre-compute the bit mask for this position
    const bitMask = 1 << bitPosition
    const targetMask = result | (bitMask - 1)
    
    let operationsCount = 0
    let currentMask = allOnes
    
    // Process the array in one pass
    for (let i = 0; i < n; i++) {
      currentMask &= nums[i]
      if ((currentMask | targetMask) === targetMask) {
        operationsCount++
        currentMask = allOnes
      }
    }
    
    // Check if we need to set this bit in the result
    if (n - operationsCount > k) {
      result |= bitMask
    }
  }
  
  return result
}
