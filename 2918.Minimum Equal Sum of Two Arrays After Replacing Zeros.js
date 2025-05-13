/**
 * Stat-driven balance: compute minimal equal sum by tracking sum and zero count
 * @intuition zeros add exactly one, so minimal possible sum = sum + zeros
 * @approach nested reduce to gather {sum, zeros}; derive minimal sums; handle no-zero, one-zero, both-zero cases
 * @complexity
 * time O(n)
 * space O(1)
 */
const minSum = (nums1, nums2) => {
  const computeStats = array =>
    array.reduce(
      (accumulator, value) => ({
        sum: accumulator.sum + (value || 0),
        zeros: accumulator.zeros + (value === 0 ? 1 : 0),
      }),
      { sum: 0, zeros: 0 }
    )
  const { sum: sum1, zeros: zeroCount1 } = computeStats(nums1)
  const { sum: sum2, zeros: zeroCount2 } = computeStats(nums2)
  const minPossibleSum1 = sum1 + zeroCount1
  const minPossibleSum2 = sum2 + zeroCount2

  if (zeroCount1 === 0 && zeroCount2 === 0) {
    return sum1 === sum2 ? sum1 : -1
  }
  if (zeroCount1 === 0) {
    return sum1 >= minPossibleSum2 ? sum1 : -1
  }
  if (zeroCount2 === 0) {
    return sum2 >= minPossibleSum1 ? sum2 : -1
  }
  return minPossibleSum1 > minPossibleSum2 ? minPossibleSum1 : minPossibleSum2
}
