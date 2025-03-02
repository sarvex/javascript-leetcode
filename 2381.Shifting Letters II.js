/**
 * @param {string} s
 * @param {number[][]} shifts
 * @return {string}
 */
function shiftingLetters(s, shifts) {
  const ALPHABET = 26
  const ASCII = 97
  const deltas = new Int32Array(s.length + 1)

  for (const element of shifts) {
    const direction = (element[2] << 1) - 1
    deltas[element[0]] += direction
    deltas[element[1] + 1] -= direction
  }

  let prefixSum = 0
  const chars = s.split('')
  for (let i = 0; i < s.length; ++i) {
    prefixSum += deltas[i]
    let code = chars[i].charCodeAt(0) - ASCII
    code = (code + prefixSum) % ALPHABET
    code = (code + ALPHABET) % ALPHABET
    chars[i] = String.fromCharCode(code + ASCII)
  }

  return chars.join('')
}
