/**
 * Recursively generate palindromes, count permutations of those divisible by a divisor.
 * @intuition Recursively build palindrome candidates digit by digit from the outside in. For each valid palindrome divisible by divisor, calculate the number of distinct permutations of its digits, avoiding leading zeros. Use a set to track processed digit frequency maps to prevent duplicate permutation calculations.
 * @approach
 * Define helper functions for factorial calculation, digits-to-number conversion, and valid permutation calculation (handling leading zeros).
 * Use a recursive function (`generatePalindromeRecursive`) to build palindrome candidates from the outside in.
 * Base case (left > right): A palindrome candidate is formed.
 * Convert `currentDigits` to a BigInt (`palindromeNum`).
 * Check if `palindromeNum` is divisible by `divisor`.
 * If divisible, calculate the digit counts array for `currentDigits`.
 * Create a unique key (e.g., comma-separated string) from the counts array to track visited frequency combinations (`visitedFrequencyKeys`).
 * If the frequency key is new, calculate the number of valid permutations using `calculateValidPermutations` (passing the counts array directly) and add it to `totalGoodIntegersCount`. Add the key to `visitedFrequencyKeys`.
 * Precompute factorials using BigInt.
 * @complexity
 * Time: O(10^(numDigits/2) * numDigits) - Generating palindromes involves roughly 10^(numDigits/2) possibilities, and permutation calculation takes O(numDigits) or less within the generation.
 * Space: O(10^(numDigits/2) + numDigits) - Storing visited frequency maps (up to 10^(numDigits/2) distinct maps) and recursion depth/factorial storage (O(numDigits)).
 * @param {number} numDigits The number of digits.
 * @param {number} divisor The divisor.
 * @returns {number} The count of good integers.
 */
const countGoodIntegers = (numDigits, divisor) => {
  const calculateFactorials = (limit) => {
    // Use BigInt for factorials to prevent overflow for larger numDigits
    // Use new Array and fill for potential performance gain
    const factorials = new Array(limit + 1).fill(0n);
    factorials[0] = 1n; // Base case for 0!
    for (let i = 1; i <= limit; i++) {
      factorials[i] = factorials[i - 1] * BigInt(i)
    }
    return factorials
  }

  const factorials = calculateFactorials(numDigits)

  const digitsToBigInt = (digitsArray) => {
    let num = 0n
    for (const digit of digitsArray) {
      num = num * 10n + BigInt(digit)
    }
    return num
  }

  /**
   * Calculates valid permutations (excluding leading zeros) for given digit counts.
   * @param {number[]} digitCounts - Array where index i holds the count of digit i.
   * @param {number} totalDigits - Length of the number (numDigits).
   * @returns {bigint} - Count of valid permutations.
   */
  const calculateValidPermutations = (digitCounts, totalDigits) => {
    let denominator = 1n
    for (const count of digitCounts) {
      // Use counts array directly
      if (count > 0) {
        denominator *= factorials[count]
      }
    }

    // Simplified formula for valid permutations (excluding leading zeros):
    // factorials[totalDigits - 1] * (totalDigits - zeroCount) / denominator
    if (totalDigits <= 0) return 0n // Edge case
    if (denominator === 0n) return 0n // Avoid division by zero

    // The formula factorials[totalDigits - 1] * BigInt(totalDigits - zeroCount) / denominator
    // correctly calculates permutations excluding those starting with zero.
    // It also handles the case zeroCount = 0 correctly.

    // We need totalDigits-1 >= 0 for factorials index.
    if (totalDigits < 1) return 0n // Already covered by totalDigits <= 0

    const zeroCount = digitCounts[0]
    const numerator = factorials[totalDigits - 1] * BigInt(totalDigits - zeroCount)
    return numerator / denominator
  }

  const visitedFrequencyKeys = new Set()
  let totalGoodIntegersCount = 0n
  const currentDigits = Array(numDigits).fill(0)
  const bigIntDivisor = BigInt(divisor)

  const generatePalindromeRecursive = (left, right) => {
    if (left > right) {
      const palindromeNum = digitsToBigInt(currentDigits)

      if (palindromeNum % bigIntDivisor === 0n) {
        // Optimized key generation: Use counts array joined by comma
        const counts = Array(10).fill(0)
        for (const digit of currentDigits) {
          counts[digit]++
        }
        const freqKey = counts.join(',')

        if (!visitedFrequencyKeys.has(freqKey)) {
          // Pass counts array directly, no Map needed
          totalGoodIntegersCount += calculateValidPermutations(counts, numDigits)
          visitedFrequencyKeys.add(freqKey)
        }
      }
      return
    }

    const startDigit = left === 0 ? 1 : 0 // Always avoid 0 as the first digit (leftmost)
    const endDigit = 9

    for (let digit = startDigit; digit <= endDigit; digit++) {
      currentDigits[left] = digit
      currentDigits[right] = digit
      generatePalindromeRecursive(left + 1, right - 1)
    }
  }

  generatePalindromeRecursive(0, numDigits - 1)

  return Number(totalGoodIntegersCount)
}
