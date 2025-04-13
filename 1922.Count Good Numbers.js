/**
 * Calculate the count of good digit strings using modular exponentiation.
 * @intuition The problem asks for the count of digit strings of length 'n' where even-indexed digits are even (0, 2, 4, 6, 8) and odd-indexed digits are prime (2, 3, 5, 7). The number of choices for even positions is 5, and for odd positions is 4. The total count is (choices for even positions)^(number of even positions) * (choices for odd positions)^(number of odd positions). Since n can be very large (up to 10^15), we need an efficient way to calculate powers modulo 10^9 + 7.
 * @approach
 * 1. Determine the number of even and odd indices. For length `n`, there are `ceil(n/2)` even indices and `floor(n/2)` odd indices.
 * 2. Use modular exponentiation (power function) to calculate `5 ^ ceil(n/2)` and `4 ^ floor(n/2)` modulo `10^9 + 7`. This avoids dealing with extremely large numbers directly.
 * 3. Multiply the results of the two exponentiations and take the modulo again to get the final answer.
 * 4. Use BigInt for calculations involving `n` and the exponents to handle potentially large values.
 * @complexity
 * Time: O(log n) - Dominated by the modular exponentiation which takes logarithmic time based on the exponent `n`.
 * Space: O(1) - We use a constant amount of extra space for variables.
 * @param {number} n The length of the digit string.
 * @returns {number} The total number of good digit strings of length n, modulo 10^9 + 7.
 */
const countGoodNumbers = (n) => {
  const MOD = 1000000007n // Use BigInt for the modulus

  // Modular exponentiation function (iterative)
  // Calculates (base^exp) % MOD efficiently
  const power = (base, exp) => {
    let res = 1n
    base %= MOD
    while (exp > 0n) {
      // If exponent is odd, multiply result with base
      if (exp % 2n === 1n) {
        res = (res * base) % MOD
      }
      // Square the base and halve the exponent (integer division)
      base = (base * base) % MOD
      exp /= 2n
    }
    return res
  }

  const nBig = BigInt(n) // Convert n to BigInt for calculations

  // Calculate the count of positions with even indices and odd indices
  // Even indices count = ceil(n / 2)
  const countEven = (nBig + 1n) / 2n
  // Odd indices count = floor(n / 2)
  const countOdd = nBig / 2n

  // Calculate 5^countEven % MOD (5 choices for even positions)
  const powerOf5 = power(5n, countEven)

  // Calculate 4^countOdd % MOD (4 choices for odd positions)
  const powerOf4 = power(4n, countOdd)

  // Final result: (powerOf5 * powerOf4) % MOD
  const result = (powerOf5 * powerOf4) % MOD

  // Convert the final BigInt result back to Number as required by LeetCode
  return Number(result)
}
