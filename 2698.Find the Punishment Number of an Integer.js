/**
 * Finds the punishment number of an integer.
 * A punishment number of n is the sum of i² for all i from 1 to n where i² can be partitioned
 * into a sequence of integers that sum to i.
 * @param {number} n - The upper limit for calculating the punishment number
 * @return {number} - The punishment number of n
 */
function punishmentNumber(n) {
  const canPartitionToSum = (digitString, startIndex, remainingSum) => {
    const stringLength = digitString.length

    // Base case: if we've processed all digits, check if we've reached the target sum
    if (startIndex >= stringLength) {
      return remainingSum === 0
    }

    let currentPartitionValue = 0

    // Try all possible partitions starting from the current index
    for (let endIndex = startIndex; endIndex < stringLength; ++endIndex) {
      // Build up the current partition value digit by digit
      currentPartitionValue = currentPartitionValue * 10 + Number(digitString[endIndex])

      // If the current partition value exceeds the remaining sum, no need to continue
      if (currentPartitionValue > remainingSum) {
        break
      }

      // Recursively check if the remaining digits can be partitioned to sum to (remainingSum - currentPartitionValue)
      if (canPartitionToSum(digitString, endIndex + 1, remainingSum - currentPartitionValue)) {
        return true
      }
    }

    return false
  }

  let punishmentSum = 0

  // Check each number from 1 to n
  for (let i = 1; i <= n; ++i) {
    const square = i * i
    const squareString = square.toString()

    // If the square can be partitioned to sum to i, add it to the punishment sum
    if (canPartitionToSum(squareString, 0, i)) {
      punishmentSum += square
    }
  }

  return punishmentSum
}
