/**
 * Matrix exp transform characters
 *
 * @intuition Represent transformations as 26×26 transition matrix exponentiated by t
 * @approach
 *  - Build base matrix B where B[i][j] is count of j from one transform of i
 *  - Compute B^t via binary exponentiation
 *  - Multiply initial count vector by B^t
 *  - Sum vector entries mod 1e9+7
 * @complexity
 *  time O(26^3 log t + n)
 *  space O(26^2 + n)
 *
 * @param {string} s input string
 * @param {number} t number of transformations
 * @param {number[]} nums mapping counts
 * @return {number} final string length mod 1e9+7
 */
const lengthAfterTransformations = (s, t, nums) => {
  const MOD = 1000000007n
  const ALPHA = 26
  const codeA = 'a'.charCodeAt(0)

  const initMatrix = () =>
    Array(ALPHA)
      .fill()
      .map(() => Array(ALPHA).fill(0n))

  const base = initMatrix()
  nums.forEach((count, i) => {
    for (let k = 1; k <= count; k++) {
      base[i][(i + k) % ALPHA] += 1n
    }
  })

  let counts = Array(ALPHA).fill(0n)

  for (const ch of s) {
    counts[ch.charCodeAt(0) - codeA] += 1n
  }

  const mulMatrix = (A, B) =>
    A.map((row, i) => row.map((_, j) => row.reduce((sum, v, k) => (sum + v * B[k][j]) % MOD, 0n)))

  const mulVector = (vec, M) =>
    Array(ALPHA)
      .fill()
      .map((_, j) => vec.reduce((sum, vi, i) => (sum + vi * M[i][j]) % MOD, 0n))

  let powerMat = base
  let exp = t

  while (exp > 0) {
    if (exp & 1) {
      counts = mulVector(counts, powerMat)
    }
    powerMat = mulMatrix(powerMat, powerMat)
    exp >>= 1
  }

  const result = counts.reduce((sum, cnt) => (sum + cnt) % MOD, 0n)
  return Number(result)
}
