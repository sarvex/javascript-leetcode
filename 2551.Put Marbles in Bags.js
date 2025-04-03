/**
 * Maximize score difference by choosing optimal adjacent pairs
 * @intuition The problem asks for the difference between the maximum and minimum scores achievable by partitioning the marbles into k bags. The score is the sum of the weights of the first and last marbles in each bag. When we place a partition between weights[i] and weights[i+1], the value weights[i] + weights[i+1] is added to the total score (once for the end of one bag, once for the start of the next). To maximize the score, we need to pick the k-1 largest adjacent sums (weights[i] + weights[i+1]). To minimize the score, we pick the k-1 smallest adjacent sums. The difference is the sum of the largest k-1 sums minus the sum of the smallest k-1 sums.
 * @approach
 * 1. Handle edge cases: If k=1 or k=n, only one partition exists, return 0.
 * 2. Calculate all adjacent pair sums: Iterate from i = 0 to n-2 and store weights[i] + weights[i+1]. Used `Array.from` for conciseness.
 * 3. Sort the pair sums in ascending order.
 * 4. Calculate the difference: Iterate k-1 times. In each iteration, add the difference between the i-th largest sum (pairSums[n - 2 - i]) and the i-th smallest sum (pairSums[i]) to the result. This directly computes (Sum of largest k-1) - (Sum of smallest k-1).
 * @complexity
 * Time: O(n log n) - Dominated by sorting the n-1 pair sums.
 * Space: O(n) - To store the n-1 pair sums.
 */
const putMarbles = (weights, k) => {
  const n = weights.length
  // If k is 1 or k equals n, there's only one way to partition,
  // so the difference between max and min score is 0.
  if (k === 1 || k === n) {
    return 0
  }

  // Calculate the sums of adjacent weights. These represent the "cost"
  // of placing a partition between weights[i] and weights[i+1].
  const pairSums = Array.from({ length: n - 1 }, (_, i) => weights[i] + weights[i + 1])

  // Sort the pair sums to easily find the smallest and largest k-1 sums.
  pairSums.sort((a, b) => a - b)

  let maxDifference = 0
  // To get the maximum difference, we sum the largest k-1 pair sums
  // and subtract the sum of the smallest k-1 pair sums.
  // This loop efficiently calculates (Sum of largest k-1) - (Sum of smallest k-1).
  for (let i = 0; i < k - 1; ++i) {
    // pairSums[n - 2 - i] accesses the largest sums from right to left.
    // pairSums[i] accesses the smallest sums from left to right.
    maxDifference += pairSums[n - 2 - i] - pairSums[i]
  }

  return maxDifference
}
