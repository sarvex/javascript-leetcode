/**
 * @param {string} s
 * @return {number}
 */
const maxScore = (s) => {
  let [left, right] = [0, 0]
  for (const c of s) {
    right += c === '1' ? 1 : 0
  }
  let ans = 0
  for (const num of s.slice(0, -1)) {
    if (num === '0') {
      ++left
    } else {
      --right
    }
    ans = Math.max(ans, left + right)
  }
  return ans
}
