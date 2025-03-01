/**
 * @param {string} s
 * @param {string} part
 * @return {string}
 */
const removeOccurrences = (s, part) => {
  while (s.includes(part)) {
    s = s.replace(part, '')
  }
  return s
}
