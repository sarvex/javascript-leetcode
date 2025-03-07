/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
const reduce = (nums, fn, init) => {
  let acc = init
  for (const x of nums) {
    acc = fn(acc, x)
  }
  return acc
}
