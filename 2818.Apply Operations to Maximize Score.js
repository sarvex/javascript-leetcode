/**
 * Monotonic stack with optimized prime factor calculation
 * @intuition We need to maximize the score by selecting subarrays with the highest prime score.
 * Using monotonic stack to find the range of influence for each element.
 * @approach
 * 1. Calculate prime factors for each number efficiently
 * 2. Use monotonic stack to find the contribution of each element
 * 3. Sort by value in descending order and apply operations greedily
 * @complexity
 * Time: O(n log n) where n is the length of the array
 * Space: O(n) for the arrays and stack
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maximumScore = (nums, k) => {
  const MOD = 1e9 + 7
  const n = nums.length

  // Calculate prime factors more efficiently
  const calculatePrimeFactors = num => {
    let count = 0
    let factor = 2
    const end = Math.sqrt(num)

    while (num > 1 && factor <= end) {
      let found = false
      while (num % factor === 0) {
        if (!found) {
          count++
          found = true
        }
        num /= factor
      }
      factor++
    }

    if (num > 1) {
      count++
    }

    return count
  }

  // Fast power calculation using recursive approach
  const fastPow = (base, exponent, mod) => {
    if (exponent === 0n) return 1n

    const half = fastPow(base, exponent >> 1n, mod) % mod
    const result = (half * half) % mod

    return exponent % 2n === 0n ? result : (result * base) % mod
  }

  // Calculate prime factors for each number
  const primeScores = nums.map(calculatePrimeFactors)

  // Calculate contribution of each element using monotonic stack
  const contributions = Array(n).fill(0)
  const stack = [-1]

  // Process elements from left to right
  for (let i = 0; i < n; i++) {
    while (stack[stack.length - 1] !== -1 && primeScores[stack[stack.length - 1]] < primeScores[i]) {
      const curr = stack.pop()
      contributions[curr] = (curr - stack[stack.length - 1]) * (i - curr)
    }
    stack.push(i)
  }

  // Process remaining elements in stack
  while (stack[stack.length - 1] !== -1) {
    const curr = stack.pop()
    contributions[curr] = (curr - stack[stack.length - 1]) * (n - curr)
  }

  // Create pairs of [value, contribution] and sort by value
  const operations = nums.map((value, index) => [value, contributions[index]])
  operations.sort((a, b) => b[0] - a[0])

  // Apply operations greedily
  let result = 1n
  const modBig = BigInt(MOD)

  for (let i = 0; i < operations.length && k > 0; i++) {
    const [value, contribution] = operations[i]
    const operationsToApply = Math.min(contribution, k)

    result = (result * fastPow(BigInt(value), BigInt(operationsToApply), modBig)) % modBig
    k -= operationsToApply
  }

  return Number(result)
}
