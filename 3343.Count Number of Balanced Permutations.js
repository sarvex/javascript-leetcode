const MOD = 1e9 + 7
const MX = 80

/**
 * Count balanced digit permutations across two halves with equal sum
 * Approach: DP + combinatorics
 * @intuition Count assignments of digits into halves to achieve equal sum
 * @approach Precompute Pascal's triangle locally, then DFS with memo to distribute digits and multiply by combination counts
 * @complexity
 *  time: O(n^2)
 *  space: O(n^2)
 */
const countBalancedPermutations = (num) => {
  const inputDigits = [...num].map(Number)
  const countByDigit = Array(10).fill(0)
  for (const digit of inputDigits) countByDigit[digit]++
  const totalSum = inputDigits.reduce((accumulator, value) => accumulator + value, 0)
  if (totalSum % 2 !== 0) return 0
  const totalDigits = inputDigits.length
  const leftHalfSize = Math.floor(totalDigits / 2)
  const rightHalfSize = totalDigits - leftHalfSize
  const targetHalfSum = totalSum / 2
  const memoMap = new Map()
  const combinationTable = (() => {
    const table = Array.from({ length: MX }, () => Array(MX).fill(0))
    table[0][0] = 1
    for (let row = 1; row < MX; row++) {
      table[row][0] = 1
      for (let col = 1; col <= row; col++) table[row][col] = (table[row - 1][col - 1] + table[row - 1][col]) % MOD
    }
    return table
  })()
  const dfs = (currentDigit, remainingSum, remainingLeftSlots, remainingRightSlots) => {
    if (currentDigit > 9) return remainingSum === 0 && remainingLeftSlots === 0 && remainingRightSlots === 0 ? 1 : 0
    if (remainingSum < 0 || remainingLeftSlots < 0 || remainingRightSlots < 0) return 0
    const key = `${currentDigit},${remainingSum},${remainingLeftSlots},${remainingRightSlots}`
    if (memoMap.has(key)) return memoMap.get(key)
    let totalWays = 0n
    for (
      let leftCountChoice = 0;
      leftCountChoice <= countByDigit[currentDigit] && leftCountChoice <= remainingLeftSlots;
      leftCountChoice++
    ) {
      const rightCountChoice = countByDigit[currentDigit] - leftCountChoice
      if (rightCountChoice > remainingRightSlots) continue
      if (currentDigit * leftCountChoice > remainingSum) break
      const leftCombCount = BigInt(combinationTable[remainingLeftSlots][leftCountChoice])
      const rightCombCount = BigInt(combinationTable[remainingRightSlots][rightCountChoice])
      const subWays = BigInt(
        dfs(
          currentDigit + 1,
          remainingSum - currentDigit * leftCountChoice,
          remainingLeftSlots - leftCountChoice,
          remainingRightSlots - rightCountChoice,
        ),
      )
      totalWays =
        (totalWays + ((((leftCombCount * rightCombCount) % BigInt(MOD)) * subWays) % BigInt(MOD))) % BigInt(MOD)
    }
    const result = Number(totalWays)
    memoMap.set(key, result)
    return result
  }
  return dfs(0, targetHalfSum, leftHalfSize, rightHalfSize)
}
