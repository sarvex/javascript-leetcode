/**
 * Process:
 * 1. Find the minimum element in the array
 * 2. Add it to the score
 * 3. Mark the minimum element and its adjacent elements
 * 4. Remove all marked elements
 * 5. Repeat until the array is empty
 *
 * @param {number[]} nums - An array of positive integers
 * @return {number} - The final score
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
const findScore = (nums) => {
  const minHeap = []
  const marked = new Array(nums.length).fill(false)

  for (let i = 0; i < nums.length; i++) {
    minHeap.push([nums[i], i])
  }

  minHeap.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]))

  let totalScore = 0

  while (minHeap.length > 0) {
    const [value, index] = minHeap.shift()

    if (marked[index]) continue

    totalScore += value

    marked[index] = true
    if (index > 0) marked[index - 1] = true
    if (index < nums.length - 1) marked[index + 1] = true
  }

  return totalScore
}
