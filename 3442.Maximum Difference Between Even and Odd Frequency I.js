/**
 * @param {string} s
 * @return {number}
 */
const maxDifference = (s) => {
  const ASCII = 97
  const ALPHABET = 26

  const freq = new Array(ALPHABET).fill(0)
  for (let i = 0; i < s.length; i++) {
    freq[s.charCodeAt(i) - ASCII]++
  }
  let maxOdd = -Infinity,
    minEven = Infinity
  for (let i = 0; i < 26; i++) {
    if (freq[i] > 0) {
      if (freq[i] % 2 !== 0 && freq[i] > maxOdd) {
        maxOdd = freq[i]
      }
      if (freq[i] % 2 === 0 && freq[i] < minEven) {
        minEven = freq[i]
      }
    }
  }
  return maxOdd - minEven
}
