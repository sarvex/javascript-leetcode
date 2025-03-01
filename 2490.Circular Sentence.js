/**
 * @param {string} sentence
 * @return {boolean}
 */
const isCircularSentence = (sentence) => {
  const ss = sentence.split(' ')
  const n = ss.length
  for (let i = 0; i < n; ++i) {
    if (!ss[i].endsWith(ss[(i + 1) % n][0])) {
      return false
    }
  }
  return true
}
