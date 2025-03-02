/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
const canConstruct = function (s, k) {
  if (s.length < k) return false
  let oddChars = new Array(26).fill(0)
  for (let i = 0; i < s.length; i++) {
    oddChars[s.charCodeAt(i) - 'a'.charCodeAt(0)] ^= 1
  }
  return oddChars.reduce((acc, count) => acc + count, 0) <= k
}
