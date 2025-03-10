/**
 * @param {string} sentence
 * @return {boolean}
 */
const isCircularSentence = (sentence) => {
  const words = sentence.split(' ')
  const n = words.length
  for (let i = 0; i < n; ++i) {
    if (!words[i].endsWith(words[(i + 1) % n][0])) {
      return false
    }
  }
  return true
}
