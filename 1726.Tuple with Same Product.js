/**
 * Finds the number of distinct tuples (a,b,c,d) where a*b = c*d and a,b,c,d are distinct elements from the input array
 * This is an optimized implementation using typed arrays for faster lookups
 * @param {number[]} nums - An array of positive integers
 * @return {number} - The number of tuples satisfying the condition
 */
function tupleSameProduct(nums) {
  // Find the maximum value in the input array
  const maxValue = Math.max(...nums)
  
  // Create a typed array to store product frequencies (faster than Map)
  // Size is based on maximum possible product
  const productFrequency = new Uint16Array(maxValue * maxValue + 1)
  
  let totalTuples = 0
  
  // Calculate products and count tuples in a single pass
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const product = nums[i] * nums[j]
      
      // Each new pair with the same product contributes 8 more tuples
      // to the answer (8 ways to arrange a,b,c,d)
      totalTuples += productFrequency[product] * 8
      
      // Increment the frequency count for this product
      productFrequency[product]++
    }
  }
  
  return totalTuples
}
