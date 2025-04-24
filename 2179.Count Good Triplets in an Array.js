/**
 * Efficiently count good triplets using Fenwick Trees for prefix/suffix counting
 * @intuition Map values to positions, count valid (x, y, z) triplets by splitting at y and using prefix/suffix sums.
 * @approach For each value y, count how many x are before y in both arrays (using Fenwick Tree), and how many z are after y in both arrays (using reverse Fenwick Tree). Multiply and sum for all y.
 * @complexity Time: O(n log n)
 * @complexity Space: O(n)
 * @param {number[]} nums1 - permutation of [0..n-1]
 * @param {number[]} nums2 - permutation of [0..n-1]
 * @returns {number} total good triplets
 */
const goodTriplets = (nums1, nums2) => {
  const n = nums1.length
    const pos2 = new Uint32Array(n)
  const idxMap = new Uint32Array(n)
  for (let i = 0; i < n; ++i) pos2[nums2[i]] = i
  for (let i = 0; i < n; ++i) idxMap[pos2[nums1[i]]] = i

  const tree = new Uint32Array(n + 2)
  const update = i => {
    for (++i; i < tree.length; i += i & -i) ++tree[i]
  }
  const query = i => {
    let res = 0
    for (++i; i > 0; i -= i & -i) res += tree[i]
    return res
  }

  let res = 0
  for (let val = 0; val < n; ++val) {
    const pos = idxMap[val]
    const left = query(pos)
    update(pos)
    const right = n - 1 - pos - (val - left)
    res += left * right
  }
  return res
}
