/**
 * Dynamic programming table for digit sum group counting (optimized)
 *
 * @intuition Use digit DP and prefix sums to efficiently count group sizes for large n.
 * @approach Precompute reference tables for digit sums, simulate digit carrying, and aggregate counts in a single pass.
 * @complexity Time: O(log n * maxDigitSum)
 * @complexity Space: O(maxDigitSum)
 * @param {number} n
 * @returns {number}
 */
const referenceTables = [[1], new Uint8Array(10), new Uint8Array(19), new Uint8Array(28)]

const countLargestGroup = (n) => {
  const digitCounts = [1, 0, 0, 0] // 1 for units, 0 for tens/hundreds/thousands
  let currentDigit = 0
  let prefixSum = 0
  const groupSizes = new Uint16Array(37)
  let number = Math.min(n, 9999)
  while (number > 0) {
    const digit = number % 10
    digitCounts[currentDigit] += digit
    prefixSum += digitCounts[currentDigit]
    currentDigit++
    number = Math.floor(number / 10)
  }
  for (let position = 0; position < digitCounts.length; position++) {
    const digitAtPosition = digitCounts[position]
    const previousTable = referenceTables[position]
    const currentTable = referenceTables[position + 1]
    const isCurrentTableBuilt = !currentTable || currentTable.at(-1)
    const iterationLimit = Math.max(position * 9 + digitAtPosition, isCurrentTableBuilt ? 0 : currentTable.length)
    prefixSum -= digitAtPosition
    let runningSum = 0
    for (let sum = 0; sum < iterationLimit; sum++) {
      runningSum += (previousTable[sum] ?? 0) - (previousTable[sum - digitAtPosition] ?? 0)
      groupSizes[prefixSum + sum] += runningSum
      if (!isCurrentTableBuilt)
        currentTable[sum] = (currentTable[sum - 1] ?? 0) + (previousTable[sum] ?? 0) - (previousTable[sum - 10] ?? 0)
    }
  }
  groupSizes[0] = 0 // exclude 0
  const maxGroupSize = Math.max(...groupSizes)
  return groupSizes.filter((size) => size === maxGroupSize).length
}
