/**
 * Count substrings that are divisible by their last digit
 * @param {string} s - String of digits
 * @return {number} - Number of substrings divisible by their last digit
 */
const countSubstrings = (s) => {
  // Constants
  const ASCII_DIGIT_OFFSET = 48
  const BASE_TEN = 10
  const CYCLE_LENGTH_MOD7 = 6

  const length = s.length
  let validSubstringCount = 0

  // Precompute remainders when divided by 3, 7, and 9
  const remaindersMod3 = new Array(length)
  const remaindersMod7 = new Array(length)
  const remaindersMod9 = new Array(length)

  // Initialize first position remainders
  remaindersMod3[0] = (s.charCodeAt(0) - ASCII_DIGIT_OFFSET) % 3
  remaindersMod7[0] = (s.charCodeAt(0) - ASCII_DIGIT_OFFSET) % 7
  remaindersMod9[0] = (s.charCodeAt(0) - ASCII_DIGIT_OFFSET) % 9

  // Calculate prefix remainders for all positions
  for (let i = 1; i < length; i++) {
    const currentDigit = s.charCodeAt(i) - ASCII_DIGIT_OFFSET
    remaindersMod3[i] = (remaindersMod3[i - 1] * BASE_TEN + currentDigit) % 3
    remaindersMod7[i] = (remaindersMod7[i - 1] * BASE_TEN + currentDigit) % 7
    remaindersMod9[i] = (remaindersMod9[i - 1] * BASE_TEN + currentDigit) % 9
  }

  // Frequency counters for remainders
  const frequencyMod3 = new Array(3).fill(0)
  const frequencyMod9 = new Array(9).fill(0)
  const frequencyMod7 = Array.from({ length: CYCLE_LENGTH_MOD7 }, () => new Array(MOD7).fill(0))

  // Modular multiplicative inverse for 10 mod 7 with cycle length 6
  const modularInverse7 = [1, 5, 4, 6, 2, 3]

  // Process each position as the ending position
  for (let position = 0; position < length; position++) {
    const lastDigit = s.charCodeAt(position) - ASCII_DIGIT_OFFSET

    if (lastDigit === 0) {
      // Skip 0 as last digit (can't divide by 0)
      continue
    } else if (lastDigit === 1 || lastDigit === 2 || lastDigit === 5) {
      // For 1, 2, 5: all numbers are divisible by these digits
      validSubstringCount += position + 1
    } else if (lastDigit === 4) {
      if (position === 0) {
        // Single digit 4 is divisible by 4
        validSubstringCount += 1
      } else {
        // For divisibility by 4, only last two digits matter
        const lastTwoDigits = (s.charCodeAt(position - 1) - ASCII_DIGIT_OFFSET) * BASE_TEN + lastDigit
        // If last two digits are divisible by 4, all prefixes work
        validSubstringCount += lastTwoDigits % 4 === 0 ? position + 1 : 1
      }
    } else if (lastDigit === 8) {
      if (position === 0) {
        // Single digit 8 is divisible by 8
        validSubstringCount += 1
      } else if (position === 1) {
        // Two digits ending with 8
        const twoDigitNumber = (s.charCodeAt(0) - ASCII_DIGIT_OFFSET) * BASE_TEN + lastDigit
        validSubstringCount += twoDigitNumber % 8 === 0 ? 2 : 1
      } else {
        // For divisibility by 8, only last three digits matter
        const lastThreeDigits =
          (s.charCodeAt(position - 2) - ASCII_DIGIT_OFFSET) * 100 +
          (s.charCodeAt(position - 1) - ASCII_DIGIT_OFFSET) * BASE_TEN +
          lastDigit
        const lastTwoDigits = (s.charCodeAt(position - 1) - ASCII_DIGIT_OFFSET) * BASE_TEN + lastDigit

        // Count: 3-digit divisible by 8, 2-digit divisible by 8, and single digit 8
        validSubstringCount += (lastThreeDigits % 8 === 0 ? position - 1 : 0) + (lastTwoDigits % 8 === 0 ? 1 : 0) + 1
      }
    } else if (lastDigit === 3 || lastDigit === 6) {
      // For divisibility by 3 or 6, use modular arithmetic with prefix sums
      validSubstringCount += (remaindersMod3[position] === 0 ? 1 : 0) + frequencyMod3[remaindersMod3[position]]
    } else if (lastDigit === 7) {
      // For divisibility by 7, use modular arithmetic with cycle length 6

      // Check for each possible prefix using modular inverse
      for (let m = 0; m < CYCLE_LENGTH_MOD7; m++) {
        const cycleIndex = ((position % CYCLE_LENGTH_MOD7) - m + CYCLE_LENGTH_MOD7) % CYCLE_LENGTH_MOD7
        const requiredRemainder = (remaindersMod7[position] * modularInverse7[m]) % 7
        validSubstringCount += frequencyMod7[cycleIndex][requiredRemainder]
      }
    } else if (lastDigit === 9) {
      // For divisibility by 9, similar to divisibility by 3
      validSubstringCount += (remaindersMod9[position] === 0 ? 1 : 0) + frequencyMod9[remaindersMod9[position]]
    }

    // Update frequency counters for next iterations
    frequencyMod3[remaindersMod3[position]]++
    frequencyMod7[position % CYCLE_LENGTH_MOD7][remaindersMod7[position]]++
    frequencyMod9[remaindersMod9[position]]++
  }

  return validSubstringCount
}
