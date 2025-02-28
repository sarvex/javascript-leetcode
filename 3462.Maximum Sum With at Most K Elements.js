/**
 * @param {number[][]} grid - The 2D array of numbers
 * @param {number[]} limits - Array of limits for each row
 * @param {number} k - Maximum number of elements to sum
 * @return {number} - Maximum possible sum with at most k elements
 */
const maxSum = (grid, limits, k) => {
  const pq = new MinPriorityQueue()
  const n = grid.length
  for (let i = 0; i < n; i++) {
    const nums = grid[i]
    const limit = limits[i]
    nums.sort((a, b) => a - b)
    for (let j = 0; j < limit; j++) {
      pq.enqueue(nums[nums.length - j - 1])
      if (pq.size() > k) {
        pq.dequeue()
      }
    }
  }
  let ans = 0
  while (!pq.isEmpty()) {
    ans += pq.dequeue()
  }
  return ans
}
