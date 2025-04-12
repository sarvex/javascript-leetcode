/**
 * @tagline Generate the k-th permutation sequence using factorials and Fenwick Tree.
 * @intuition The core idea remains the same: determine digits sequentially using factorials. The bottleneck is finding the k-th available digit among the remaining ones. Using a simple list leads to O(n) removal. A Fenwick tree allows finding the k-th available number and marking it as used in O(log n) time.
 * @approach Use a Fenwick Tree (BIT) to maintain the count of available numbers. In each step, calculate the rank of the digit needed based on k and the factorial. Use the BIT to efficiently find the number corresponding to that rank among the available numbers. Mark the chosen number as used in the BIT. Precompute factorials to avoid recalculation.
 * @complexity
 * Time: O(n log n) - Precomputing factorials is O(n). Initializing BIT is O(n log n). The main loop runs n times. Inside the loop, finding the k-th element using BIT takes O(log n), updating BIT takes O(log n). Total: O(n) + O(n log n) + n * (O(log n) + O(log n)) = O(n log n).
 * Space: O(n) - To store the factorials and the Fenwick Tree.
 * @param {number} n The number of elements (1 to n).
 * @param {number} k The 1-based index of the desired permutation.
 * @returns {string} The k-th permutation sequence.
 */
const getPermutation = (n, k) => {
  // --- Fenwick Tree (BIT) Implementation ---
  const tree = Array(n + 1).fill(0)

  const update = (i, delta) => {
    while (i <= n) {
      tree[i] += delta
      i += i & -i
    }
  }

  const query = (i) => {
    let sum = 0
    while (i > 0) {
      sum += tree[i]
      i -= i & -i
    }
    return sum
  }

  const findKth = (k) => {
    let low = 1,
      high = n
    let ans = n
    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      if (query(mid) >= k) {
        ans = mid
        high = mid - 1
      } else {
        low = mid + 1
      }
    }
    return ans
  }

  for (let i = 1; i <= n; i++) {
    update(i, 1)
  }

  const factorials = [1]
  for (let i = 1; i < n; i++) {
    factorials[i] = factorials[i - 1] * i
  }

  let result = ''
  let currentK = k - 1

  for (let i = n; i > 0; i--) {
    const factorial = factorials[i - 1]
    const rank = Math.floor(currentK / factorial) + 1

    const digit = findKth(rank)
    result += digit
    update(digit, -1)

    currentK %= factorial
  }

  return result
}
