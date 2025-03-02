/**
 * @param {number[][]} nums1
 * @param {number[][]} nums2
 * @return {number[][]}
 */
const mergeArrays = (nums1, nums2) => {
  const n = 1001
  const cnt = new Array(n).fill(0)
  for (const [a, b] of nums1) {
    cnt[a] += b
  }
  for (const [a, b] of nums2) {
    cnt[a] += b
  }
  const ans = []
  for (let i = 0; i < n; ++i) {
    if (cnt[i] > 0) {
      ans.push([i, cnt[i]])
    }
  }
  return ans
}
