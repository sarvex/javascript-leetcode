/**
 * Returns the count of selectable integers (1 to upperBound), skipping banned values, such that their cumulative sum does not exceed maximumAllowedSum.
 * @param {number[]} banned
 * @param {number} n
 * @param {number} maxSum
 * @return {number}
 */

const maxCount = (bannedNumbers, upperBound, maximumAllowedSum) => {
  const bannedSet = new Set(bannedNumbers)
  let currentSum = 0
  let selectedCount = 0

  for (let number = 1; number <= upperBound; number++) {
    if (currentSum + number > maximumAllowedSum) break
    if (bannedSet.has(number)) continue
    currentSum += number
    selectedCount++
  }

  return selectedCount
}
