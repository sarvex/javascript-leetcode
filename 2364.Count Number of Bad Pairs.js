/**
 * @param {number[]} nums
 * @return {number}
 */
const countBadPairs = (nums) => {
  const cnt = new Map()
  let ans = 0
  for (let i = 0; i < nums.length; ++i) {
    const x = i - nums[i]
    ans += i - (cnt.get(x) ?? 0)
    cnt.set(x, (cnt.get(x) ?? 0) + 1)
  }
  return ans
}
