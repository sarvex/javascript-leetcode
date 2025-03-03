const maximumBeauty = (nums, k) => {
  const maxNum = Math.max(...nums)
  const diffArraySize = maxNum + 2 * k + 2
  const diff = Array(diffArraySize).fill(0)

  for (const num of nums) {
    diff[num]++
    diff[num + 2 * k + 1]--
  }

  let curr = 0,
    best = 0
  for (const delta of diff) {
    curr += delta
    best = Math.max(best, curr)
  }
  return best
}
