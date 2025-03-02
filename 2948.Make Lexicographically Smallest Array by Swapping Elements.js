/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number[]}
 */
const lexicographicallySmallestArray = (nums, limit) => {
  const n = nums.length
  const index = Array.from({ length: n }, (_, i) => i)
  index.sort((i, j) => nums[i] - nums[j])
  const result = Array(n).fill(0)
  for (let i = 0; i < n; ) {
    let j = i + 1
    while (j < n && nums[index[j]] - nums[index[j - 1]] <= limit) {
      j++
    }
    const t = index.slice(i, j).sort((a, b) => a - b)
    for (let k = i; k < j; k++) {
      result[t[k - i]] = nums[index[k]]
    }
    i = j
  }
  return result
}
