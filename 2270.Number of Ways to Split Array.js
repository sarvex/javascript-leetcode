/**
 * @param {number[]} nums
 * @return {number}
 */
const waysToSplitArray = (nums) => {
  let sum = nums.reduce((acc, cur) => acc + cur, 0)
  let [ans, total] = [0, 0]
  for (const x of nums.slice(0, -1)) {
    total += x
    sum -= x
    if (total >= sum) {
      ++ans
    }
  }
  return ans
}
