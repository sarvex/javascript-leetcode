/**
 * @param {string} s
 * @return {string}
 */
const clearDigits = (s) => {
  let stack = ''

  for (const element of s) {
    const char = element
    if (Number.isNaN(Number(char))) {
      stack += char
    } else {
      stack = stack.slice(0, -1)
    }
  }
  return stack
}
