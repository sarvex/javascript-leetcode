/**
 * @description Finds the closest pair of prime numbers within a given range [left, right]
 *
 * @param {number} left - The lower bound of the range (inclusive)
 * @param {number} right - The upper bound of the range (inclusive)
 * @return {number[]} - Array containing the closest pair of primes [num1, num2] or [-1, -1] if no such pair exists
 *
 * @example closestPrimes(1, 10) // returns [3, 5]
 * @example closestPrimes(10, 20) // returns [11, 13]
 * @example closestPrimes(1, 1) // returns [-1, -1] (no prime numbers in range)
 *
 * @complexity Time: O((right - left) * sqrt(right)), Space: O(right - left)
 */
const closestPrimes = (left, right) => {
  const findPrimesInRange = (left, right) => {
    const start = Math.max(2, left)
    const isPrime = Array(right + 1).fill(true)

    isPrime[0] = isPrime[1] = false

    const sqrtRight = Math.sqrt(right)
    for (let i = 2; i <= sqrtRight; i++) {
      if (isPrime[i]) {
        for (let j = i * i; j <= right; j += i) {
          isPrime[j] = false
        }
      }
    }

    const primes = []
    for (let i = start; i <= right; i++) {
      if (isPrime[i]) {
        primes.push(i)
      }
    }

    return primes
  }

  const primes = findPrimesInRange(left, right)

  if (primes.length < 2) {
    return [-1, -1]
  }

  let minGap = Infinity
  let result = [-1, -1]

  for (let i = 1; i < primes.length; i++) {
    const currentGap = primes[i] - primes[i - 1]

    if (currentGap < minGap) {
      minGap = currentGap
      result = [primes[i - 1], primes[i]]

      // 2 is the minimum possible gap between primes (except between 2 and 3)
      if (minGap === 2) break
    }
  }

  return result
}
