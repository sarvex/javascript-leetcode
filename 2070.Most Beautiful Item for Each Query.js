/**
 * Finds the most beautiful item within price constraint for each query
 *
 * @param {number[][]} items - Array of [price, beauty] pairs
 * @param {number[]} queries - Array of price constraints
 * @return {number[]} Maximum beauty values for each query
 */
const maximumBeauty = (items, queries) => {
  // Sort items by price in ascending order
  items.sort((a, b) => a[0] - b[0])

  // Update beauty values to maintain maximum beauty at each price point
  // This creates a monotonically increasing beauty sequence by price
  const n = items.length
  for (let i = 1; i < n; ++i) {
    items[i][1] = Math.max(items[i][1], items[i - 1][1])
  }

  return queries.map((query) => {
    let left = 0
    let right = n

    while (left < right) {
      const mid = (left + right) >> 1
      if (items[mid][0] > query) {
        right = mid
      } else {
        left = mid + 1
      }
    }

    return --left >= 0 ? items[left][1] : 0
  })
}
