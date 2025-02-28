/**
 * Counts the number of substrings in a given string that are divisible by their last digit.
 * Uses optimizations for each last digit based on divisibility rules:
 * - For digits 1, 2, 5: All numbers ending with these are divisible by them
 * - For digit 4: Check if last two digits form a number divisible by 4
 * - For digit 8: Check if last three digits form a number divisible by 8
 * - For digits 3, 6, 9: Use modular arithmetic with prefix sums
 * - For digit 7: Use modular arithmetic with a special approach for cycle length 6
 *
 * @param {string} s
 * @return {number}
 */
const countSubstrings = (s) => {
  // Constants to improve readability
  const ASCII_ZERO = 48
  const BASE_10 = 10
  const BASE_10_SQUARED = 100
  const CYCLE_LENGTH_7 = 6

  const stringLength = s.length
  let divisibleSubstringCount = 0

  // Convert ASCII character to numeric digit
  const convertCharToDigit = (char) => char.charCodeAt(0) - ASCII_ZERO

  // Precompute prefix remainders when divided by 3, 7, and 9
  const prefixRemainders3 = new Array(stringLength)
  const prefixRemainders7 = new Array(stringLength)
  const prefixRemainders9 = new Array(stringLength)

  // Initialize prefix remainders for the first position
  prefixRemainders3[0] = convertCharToDigit(s[0]) % 3
  prefixRemainders7[0] = convertCharToDigit(s[0]) % 7
  prefixRemainders9[0] = convertCharToDigit(s[0]) % 9

  // Calculate prefix remainders for all positions
  for (let index = 1; index < stringLength; index++) {
    const currentDigit = convertCharToDigit(s[index])
    prefixRemainders3[index] = (prefixRemainders3[index - 1] * BASE_10 + currentDigit) % 3
    prefixRemainders7[index] = (prefixRemainders7[index - 1] * BASE_10 + currentDigit) % 7
    prefixRemainders9[index] = (prefixRemainders9[index - 1] * BASE_10 + currentDigit) % 9
  }

  // Frequency counters for remainders
  const remainderFrequency3 = new Array(3).fill(0)
  const remainderFrequency9 = new Array(9).fill(0)

  // For divisor 7, we need to track remainder frequency by position in cycle of length 6
  const remainderFrequency7 = Array.from({ length: CYCLE_LENGTH_7 }, () => new Array(7).fill(0))

  // Modular multiplicative inverse for 10^i mod 7 with cycle length 6
  const modularInverse7 = [1, 5, 4, 6, 2, 3]

  // Process each position as the ending position of potential substrings
  for (let endPosition = 0; endPosition < stringLength; endPosition++) {
    const currentDigit = convertCharToDigit(s[endPosition])

    if (currentDigit === 0) {
      // Skip 0 as last digit (division by zero is undefined)
    } else if (currentDigit === 1 || currentDigit === 2 || currentDigit === 5) {
      // For 1, 2, 5: all numbers are divisible by these digits
      // Count all substrings ending at this position
      divisibleSubstringCount += endPosition + 1
    } else if (currentDigit === 4) {
      if (endPosition === 0) {
        // Single digit 4 is divisible by 4
        divisibleSubstringCount += 1
      } else {
        // For divisibility by 4, only last two digits matter
        const lastTwoDigits = convertCharToDigit(s[endPosition - 1]) * BASE_10 + currentDigit

        // If last two digits form a number divisible by 4, all prefixes work
        // Otherwise, only the single digit 4 works
        divisibleSubstringCount += lastTwoDigits % 4 === 0 ? endPosition + 1 : 1
      }
    } else if (currentDigit === 8) {
      if (endPosition === 0) {
        // Single digit 8 is divisible by 8
        divisibleSubstringCount += 1
      } else if (endPosition === 1) {
        // Two digits ending with 8
        const twoDigitNumber = convertCharToDigit(s[0]) * BASE_10 + currentDigit
        divisibleSubstringCount += twoDigitNumber % 8 === 0 ? 2 : 1
      } else {
        // For divisibility by 8, last three digits determine divisibility
        const lastThreeDigits =
          convertCharToDigit(s[endPosition - 2]) * BASE_10_SQUARED +
          convertCharToDigit(s[endPosition - 1]) * BASE_10 +
          currentDigit

        const lastTwoDigits = convertCharToDigit(s[endPosition - 1]) * BASE_10 + currentDigit

        // Count substrings: all prefixes with divisible 3-digit suffixes,
        // any 2-digit suffix that's divisible, and the single digit 8 itself
        divisibleSubstringCount +=
          (lastThreeDigits % 8 === 0 ? endPosition - 1 : 0) + (lastTwoDigits % 8 === 0 ? 1 : 0) + 1
      }
    } else if (currentDigit === 3 || currentDigit === 6) {
      // For divisibility by 3 or 6, use modular arithmetic with prefix sums

      // If entire prefix is divisible by 3, count it
      const entirePrefixDivisible = prefixRemainders3[endPosition] === 0 ? 1 : 0

      // Count prefixes with the complementary remainder
      const prefixesWithComplementaryRemainder = remainderFrequency3[prefixRemainders3[endPosition]]

      divisibleSubstringCount += entirePrefixDivisible + prefixesWithComplementaryRemainder
    } else if (currentDigit === 7) {
      // For divisibility by 7, use modular arithmetic with cycle length 6

      // If entire prefix is divisible by 7, count it
      divisibleSubstringCount += prefixRemainders7[endPosition] === 0 ? 1 : 0

      // Check for each possible prefix using modular inverse
      for (let cyclePosition = 0; cyclePosition < CYCLE_LENGTH_7; cyclePosition++) {
        // Calculate cycle index based on current position and cycle position
        const cycleIndex = ((endPosition % CYCLE_LENGTH_7) - cyclePosition + CYCLE_LENGTH_7) % CYCLE_LENGTH_7

        // Calculate required remainder using modular inverse
        const requiredRemainder = (prefixRemainders7[endPosition] * modularInverse7[cyclePosition]) % 7

        // Add count of prefixes with the required remainder at the appropriate cycle position
        divisibleSubstringCount += remainderFrequency7[cycleIndex][requiredRemainder]
      }
    } else if (currentDigit === 9) {
      // For divisibility by 9, similar to divisibility by 3

      // If entire prefix is divisible by 9, count it
      const entirePrefixDivisible = prefixRemainders9[endPosition] === 0 ? 1 : 0

      // Count prefixes with the complementary remainder
      const prefixesWithComplementaryRemainder = remainderFrequency9[prefixRemainders9[endPosition]]

      divisibleSubstringCount += entirePrefixDivisible + prefixesWithComplementaryRemainder
    }

    // Update frequency counters for next iterations
    remainderFrequency3[prefixRemainders3[endPosition]]++
    remainderFrequency7[endPosition % CYCLE_LENGTH_7][prefixRemainders7[endPosition]]++
    remainderFrequency9[prefixRemainders9[endPosition]]++
  }

  return divisibleSubstringCount
}
