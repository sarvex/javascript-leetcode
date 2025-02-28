/**
 * @param {string} s
 * @return {number}
 */
const maximumLength = (s) => {
  let count = 1,
    prev = s[0],
    hash = new Map(),
    max = -1
  const updateHash = () => {
    if (!hash.has(prev)) hash.set(prev, [])
    let arr = hash.get(prev),
      i = 0
    while (i < count) {
      let added = count - i
      arr[i] = arr[i] ? arr[i] + added : added
      if (arr[i] >= 3) {
        max = Math.max(max, i + 1)
      }
      i++
    }
  }
  for (let i = 1; i < s.length; i++) {
    if (prev == s[i]) {
      count++
      continue
    }
    updateHash()
    prev = s[i]
    count = 1
  }
  updateHash()
  return max
}
