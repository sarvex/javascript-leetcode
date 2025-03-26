/**
 * Optimized solution using monotonic queues
 *
 * @intuition
 * We track the minimum and maximum elements for all subarrays with at most k elements
 * using two monotonic queues. For each ending position, we calculate the contribution
 * of elements to the min/max sums.
 *
 * @approach
 * 1. Maintain separate monotonic queues for tracking minimums and maximums
 * 2. For each element, update the queues and calculate contributions
 * 3. Track counts of elements in the queues to handle duplicates efficiently
 *
 * @complexity
 * Time: O(n), where n is the length of nums - we process each element exactly once
 * Space: O(k), for the queues which store at most k elements
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minMaxSubarraySum = (nums, k) => {
  let sum = 0
  
  // Arrays to track indices and counts for min/max queues
  const minQueue = []
  const maxQueue = []
  const minCounts = []
  const maxCounts = []
  
  // Track running sums and lengths
  let minSum = 0
  let maxSum = 0
  let minLen = 0
  let maxLen = 0
  
  // Front pointers for the queues
  let minFront = 0
  let maxFront = 0
  
  for (let i = 0; i < nums.length; i++) {
    // Update minimum queue - maintain monotonic increasing
    while (minQueue.length > minFront && nums[minQueue.at(-1)] > nums[i]) {
      const removedIndex = minQueue.pop()
      const removedCount = minCounts.pop()
      minSum -= nums[removedIndex] * removedCount
      minLen -= removedCount
    }
    
    // Update maximum queue - maintain monotonic decreasing
    while (maxQueue.length > maxFront && nums[maxQueue.at(-1)] < nums[i]) {
      const removedIndex = maxQueue.pop()
      const removedCount = maxCounts.pop()
      maxSum -= nums[removedIndex] * removedCount
      maxLen -= removedCount
    }
    
    // Current window size is min(i+1, k)
    const windowSize = Math.min(i + 1, k)
    
    // Remove elements outside the window for min queue
    if (minQueue.length > minFront && i >= k) {
      minSum -= nums[minQueue[minFront]]
      minLen--
      
      if (minCounts[minFront] > 1) {
        minCounts[minFront]--
      } else {
        minFront++
      }
    }
    
    // Remove elements outside the window for max queue
    if (maxQueue.length > maxFront && i >= k) {
      maxSum -= nums[maxQueue[maxFront]]
      maxLen--
      
      if (maxCounts[maxFront] > 1) {
        maxCounts[maxFront]--
      } else {
        maxFront++
      }
    }
    
    // Add current element to min queue
    minQueue.push(i)
    const minContribution = windowSize - minLen
    minCounts.push(minContribution)
    minSum += nums[i] * minContribution
    minLen = windowSize
    
    // Add current element to max queue
    maxQueue.push(i)
    const maxContribution = windowSize - maxLen
    maxCounts.push(maxContribution)
    maxSum += nums[i] * maxContribution
    maxLen = windowSize
    
    // Add current window's contribution to total sum
    sum += minSum + maxSum
  }
  
  return sum
}

module.exports = minMaxSubarraySum
