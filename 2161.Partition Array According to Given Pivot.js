/**
 * @param {number[]} nums
 * @param {number} pivot
 * @return {number[]}
 */
const pivotArray = (nums, pivot) => {
  const ans = []
  for (const x of nums) {
    if (x < pivot) {
      ans.push(x)
    }
  }
  for (const x of nums) {
    if (x === pivot) {
      ans.push(x)
    }
  }
  for (const x of nums) {
    if (x > pivot) {
      ans.push(x)
    }
  }
  return ans
}
