/**
 * Calculates the minimum possible value for the last element of an array
 * with n elements, where the bitwise OR of all elements equals x.
 *
 * Algorithm:
 * 1. Decrement n by 1 (as we're looking for the last element)
 * 2. Start with x as the base value
 * 3. For each unset bit in x, use a bit from n-1
 * 4. Any remaining bits from n-1 go to position 31 and above
 *
 * @param {number} n - The number of elements in the array
 * @param {number} x - The target bitwise OR value of all elements
 * @return {number} - The minimum possible value for the last element
 *
 * Time Complexity: O(1) - Fixed number of bit operations
 * Space Complexity: O(1) - Constant extra space
 */
const minEnd = (n, x) => {
  const decrementedN = n - 1
  let result = BigInt(x)
  let remainingBits = decrementedN

  for (let bitPosition = 0; bitPosition < 31; ++bitPosition) {
    if (((x >> bitPosition) & 1) === 0) {
      result |= BigInt(remainingBits & 1) << BigInt(bitPosition)
      remainingBits >>= 1
    }
  }

  result |= BigInt(remainingBits) << BigInt(31)

  return Number(result)
}
