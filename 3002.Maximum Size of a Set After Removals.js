/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const maximumSetSize = (nums1, nums2) => {
  const n = nums1.length
  const half = n / 2

  // Create sets for unique elements in each array
  const set1 = new Set(nums1)
  const set2 = new Set(nums2)
  
  // Count elements in each set and their intersection more efficiently
  let uniqueCount1 = 0
  let uniqueCount2 = 0
  let commonCount = 0
  
  // Count elements unique to set1 and common elements in one pass
  for (const num of set1) {
    if (set2.has(num)) {
      commonCount++
    } else {
      uniqueCount1++
    }
  }
  
  // Count elements unique to set2
  uniqueCount2 = set2.size - commonCount
  
  // Take as many unique elements as possible (up to half)
  const take1 = Math.min(uniqueCount1, half)
  const take2 = Math.min(uniqueCount2, half)
  
  // Calculate remaining slots for common elements
  const remaining1 = half - take1
  const remaining2 = half - take2
  
  // Calculate how many common elements we can include
  const takeCommon = Math.min(commonCount, remaining1 + remaining2)
  
  // Final result is the sum of all unique elements we can take
  return take1 + take2 + takeCommon
}
