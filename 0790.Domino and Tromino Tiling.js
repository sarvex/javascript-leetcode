/**
 * Top-Down DP with Memoization
 * @intuition
 * Use recursion + a Map cache (memo) to avoid recomputing subproblems.
 * @approach
 * - f(0)=1, f(1)=1, f(2)=2
 * - For n≥3: f(n) = 2·f(n−1) + f(n−3)  (mod 10^9+7)
 * @complexity
 * Time: O(n) — each n computed once
 * Space: O(n) for recursion+memo
 */

/**
 * @param {number} n
 * @param {Map<number,number>} memo
 * @return {number}
 */
const numTilings = (n, memo = new Map()) => {
  const MOD = 1e9 + 7
  if (n === 0) return 1
  if (n < 3) return n
  if (memo.has(n)) return memo.get(n)

  // recurse with memo
  const ways = (2 * numTilings(n - 1, memo) + numTilings(n - 3, memo)) % MOD
  memo.set(n, ways)
  return ways
}
