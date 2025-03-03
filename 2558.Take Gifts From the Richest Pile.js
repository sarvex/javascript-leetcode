/**
 * Replaces the largest gift repeatedly with its floored square root.
 * @param {number[]} gifts - Array of gift counts.
 * @param {number} k - Number of operations.
 * @return {number} - Sum of gifts after operations.
 */
const pickGifts = (gifts, k) => {
  const n = gifts.length
  while (k-- > 0) {
    let richestIndex = 0
    for (let i = 0; i < n; i++) {
      if (gifts[i] > gifts[richestIndex]) richestIndex = i
    }
    gifts[richestIndex] = Math.floor(Math.sqrt(gifts[richestIndex]))
  }
  return gifts.reduce((sum, count) => sum + count, 0)
}
