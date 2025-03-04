/**
 * @param {string} sentence
 * @param {string} searchWord
 * @return {number}
 */
const isPathCrossing = (path) => {
  let [i, j] = [0, 0]
  const visited = new Set()
  visited.add(0)
  for (const c of path) {
    if (c === 'N') {
      --i
    } else if (c === 'S') {
      ++i
    } else if (c === 'E') {
      ++j
    } else if (c === 'W') {
      --j
    }
    const t = i * 20000 + j
    if (visited.has(t)) {
      return true
    }
    visited.add(t)
  }
  return false
}
