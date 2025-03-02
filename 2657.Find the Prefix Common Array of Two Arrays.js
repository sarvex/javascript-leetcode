/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
const findThePrefixCommonArray = (A, B) => {
  const n = A.length
  const visited = Array(n + 1).fill(1)
  const result = []
  let s = 0
  for (let i = 0; i < n; ++i) {
    const [a, b] = [A[i], B[i]]
    visited[a] ^= 1
    s += visited[a]
    visited[b] ^= 1
    s += visited[b]
    result.push(s)
  }
  return result
}
