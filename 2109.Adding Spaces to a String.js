/**
 * @param {string} s
 * @param {number[]} spaces
 * @return {string}
 */
const addSpaces = (s, spaces) => {
  const result = []
  for (let i = 0, j = 0; i < s.length; i++) {
    if (i === spaces[j]) {
      result.push(' ')
      j++
    }
    result.push(s[i])
  }
  return result.join('')
}
