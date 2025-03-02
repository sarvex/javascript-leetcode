/**
 * @param {string} s
 * @return {number}
 */
const countPalindromicSubsequence = (s) => {
  const ALPHABET = 26
  const ASCII = 97
  let result = 0
  const chars = Array.from({ length: 26 }, (v, i) => String.fromCharCode(97 + i))
  for (const c1 of chars) {
    const fi = s.indexOf(c1)
    if (fi === -1) {
      continue
    }
    for (const c2 of chars) {
      const si = s.indexOf(c2, fi + 1)
      if (si === -1) {
        continue
      }
      if (s.indexOf(c1, si + 1) > -1) {
        result++
      }
    }
  }
  return result
}
