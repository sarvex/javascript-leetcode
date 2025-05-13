/**
 * Optimized count-array transformations per round
 *
 * @intuition Each character shifts or splits, so track outcome counts via dynamic programming
 * @approach
 *  - Initialize count array of size 26 with 0s
 *  - Count occurrences of each character in inputString
 *  - Iterate transformationCount times, updating count array: for i<25 cnt[i]=prev[i+1], cnt[0]=prev[25], cnt[1]=(prev[25]+prev[0]) mod MOD
 *  - Sum count values
 * @complexity
 *  time O(26 * transformationCount + n)
 *  space O(26)
 *
 * @param {string} inputString original string
 * @param {number} transformationCount number of transformations
 * @return {number} total characters after transformations mod 1e9+7
 */
const lengthAfterTransformations = (inputString, transformationCount) => {
  const MOD = 1e9 + 7
  const aCode = 'a'.charCodeAt(0)
  let charCounts = Array(26).fill(0)
  for (const char of inputString) charCounts[char.charCodeAt(0) - aCode]++
  for (let round = 0; round < transformationCount; round++) {
    const nextCounts = Array(26).fill(0)
    nextCounts[0] = charCounts[25]
    nextCounts[1] = (charCounts[25] + charCounts[0]) % MOD
    for (let letterIndex = 2; letterIndex < 26; letterIndex++) nextCounts[letterIndex] = charCounts[letterIndex - 1]
    charCounts = nextCounts
  }
  return charCounts.reduce((total, count) => (total + count) % MOD, 0)
}
