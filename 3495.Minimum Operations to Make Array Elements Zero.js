/**
 * Mathematical approach with power of 4 ranges
 *
 * @intuition When we divide by 4 and floor, operations needed follow a pattern based on ranges of powers of 4
 *
 * @approach
 * 1. For each query [l,r], we analyze ranges between powers of 4: [1,3], [4,15], [16,63], etc.
 * 2. Numbers in range [4^(n-1), 4^n-1] need exactly n operations to become zero
 * 3. We count how many numbers fall in each range and multiply by the operations needed
 * 4. The total operations needed is ceil(sum/2) since we can pair numbers in each operation
 *
 * @complexity
 * Time: O(Q * log_4(max(r))) where Q is the number of queries
 * Space: O(1) - constant extra space
 *
 * @param {number[][]} queries
 * @return {number}
 */
const minOperations = queries => {
  let totalOperationsCount = 0

  for (const [rangeStart, rangeEnd] of queries) {
    let operationsPerNumber = 0
    let powerOfFourLowerBound = 1

    for (let operationsRequired = 1; operationsRequired < 21; operationsRequired++) {
      const powerOfFourUpperBound = powerOfFourLowerBound * 4
      const effectiveRangeStart = Math.max(rangeStart, powerOfFourLowerBound)
      const effectiveRangeEnd = Math.min(rangeEnd, powerOfFourUpperBound - 1)

      if (effectiveRangeEnd >= effectiveRangeStart) {
        const numbersInRange = effectiveRangeEnd - effectiveRangeStart + 1
        operationsPerNumber += numbersInRange * operationsRequired
      }

      powerOfFourLowerBound = powerOfFourUpperBound
    }

    totalOperationsCount += Math.floor((operationsPerNumber + 1) / 2)
  }

  return totalOperationsCount
}

module.exports = minOperations
