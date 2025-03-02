/**
 * @param {string} s
 * @return {number}
 */
const minimumLength = (s) => {
  const ALPHABET = 26
  const ASCII = 97

  const frequencies = new Uint32Array(ALPHABET)
  for (let i = 0; i < s.length; ++i) {
    ++frequencies[s.charCodeAt(i) - ASCII]
  }

  let length = 0
  for (let i = 0; i < ALPHABET; ++i) {
    if (frequencies[i] > 0) {
      length += 2 - (frequencies[i] & 1)
    }
  }

  return length
}
