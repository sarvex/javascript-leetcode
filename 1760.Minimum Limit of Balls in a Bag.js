/**
 * Returns the minimum bag size ensuring that the number of split operations
 * does not exceed maxAllowedOperations.
 * @param {number[]} ballCounts
 * @param {number} maxAllowedOperations
 * @return {number}
 */
const minimumSize = function (ballCounts, maxAllowedOperations) {
  let start = 1
  let end = Math.max(...ballCounts)
  let ans

  while (start <= end) {
    const candidateSize = Math.floor((start + end) / 2)
    if (isValid(candidateSize)) {
      ans = candidateSize
      end = candidateSize - 1
    } else {
      start = candidateSize + 1
    }
  }
  return ans

  // Checks if candidateSize results in operations within maxAllowedOperations.
  function isValid(candidateSize) {
    let totalOps = 0
    for (const element of ballCounts) {
      totalOps += Math.floor((element - 1) / candidateSize)
    }
    return totalOps <= maxAllowedOperations
  }
}
