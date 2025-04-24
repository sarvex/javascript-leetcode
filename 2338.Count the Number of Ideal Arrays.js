const MOD = 1e9 + 7
const MAX_N = 10010
const MAX_P = 15 // Up to 15 prime factors for values up to 1e4
const c = Array(MAX_N + MAX_P)
for (let i = 0; i < c.length; ++i) c[i] = Array(MAX_P + 1).fill(0)
const sieve = Array(MAX_N).fill(0)
const ps = Array(MAX_N)
for (let i = 0; i < MAX_N; ++i) ps[i] = []
;(() => {
  const fillSieve = () => {
    for (let i = 2; i < MAX_N; ++i)
      if (sieve[i] === 0) for (let j = i; j < MAX_N; j += i) if (sieve[j] === 0) sieve[j] = i
  }
  const fillPrimeMultiplicities = () => {
    for (let i = 2; i < MAX_N; ++i) {
      let x = i
      while (x > 1) {
        const p = sieve[x]
        let cnt = 0
        while (x % p === 0) {
          x = Math.floor(x / p)
          cnt++
        }
        ps[i].push(cnt)
      }
    }
  }
  const fillBinomial = () => {
    c[0][0] = 1
    for (let i = 1; i < MAX_N + MAX_P; ++i) {
      c[i][0] = 1
      for (let j = 1; j <= Math.min(i, MAX_P); ++j) c[i][j] = (c[i - 1][j] + c[i - 1][j - 1]) % MOD
    }
  }
  fillSieve()
  fillPrimeMultiplicities()
  fillBinomial()
})()

/**
 * Tagline: Prime factorization + stars and bars combinatorics for ideal arrays
 * @intuition Reduce the problem to distributing prime factors (with multiplicity) into n positions using combinatorics
 * @approach Precompute minimum prime factors and binomial coefficients, factorize each number, and count ways to distribute each prime's multiplicity using combinations
 * @complexity Time: O(maxValue * log(maxValue) + maxValue * MAX_P)\nSpace: O(maxValue * MAX_P)
 * @param {number} n - Length of the array
 * @param {number} maxValue - Maximum value allowed in the array
 * @returns {number} Number of ideal arrays modulo 1e9+7
 */
const idealArrays = (n, maxValue) =>
  Number(
    Array.from({ length: maxValue }, (_, i) =>
      ps[i + 1].reduce((mul, p) => (mul * BigInt(c[n + p - 1][p])) % BigInt(MOD), 1n),
    ).reduce((sum, val) => (sum + val) % BigInt(MOD), 0n),
  )
