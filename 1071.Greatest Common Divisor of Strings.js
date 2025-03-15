/**
 * @intuition
 * If string x divides both str1 and str2, then str1 + str2 should equal str2 + str1.
 * The length of the GCD string must be the GCD of the lengths of str1 and str2.
 *
 * @approach
 * 1. Check if str1 + str2 equals str2 + str1. If not, return empty string
 * 2. Find the GCD of the lengths of str1 and str2 using Euclidean algorithm
 * 3. Return the substring of either string with length equal to the GCD
 *
 * @complexity
 * Time: O(n) where n is the total length of both strings
 * Space: O(n) for string concatenation
 *
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
const gcdOfStrings = (str1, str2) => {
  // If strings don't divide each other, return empty string
  if (str1 + str2 !== str2 + str1) return ''

  // Find the GCD of lengths using Euclidean algorithm
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))
  const gcdLength = gcd(str1.length, str2.length)

  // Return the substring with length equal to GCD
  return str1.slice(0, gcdLength)
}
