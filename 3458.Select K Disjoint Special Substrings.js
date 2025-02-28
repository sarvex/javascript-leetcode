/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
const maxSubstringLength = (s, k) => {
  const firstMap = new Map()
  const endMap = new Map()
  const countMap = new Map()
  for (let i = 0; i < s.length; i++) {
    if (!firstMap.has(s[i])) {
      firstMap.set(s[i], i)
    }
    endMap.set(s[i], i)
    countMap.set(s[i], (countMap.get(s[i]) ?? 0) + 1)
  }

  const intervals = []
  for (const [, start] of firstMap) {
    for (const [, end] of endMap) {
      if (end < start) continue

      let count = 0
      for (const [char, freq] of countMap) {
        if (firstMap.get(char) >= start && endMap.get(char) <= end) {
          count += freq
        }
      }
      const subLength = end - start + 1
      if (count === subLength && subLength !== s.length) {
        intervals.push([start, end])
      }
    }
  }
  intervals.sort((a, b) => a[1] - a[0] - (b[1] - b[0]))

  const ans = []
  for (const [start, end] of intervals) {
    if (ans.every(([prevStart, prevEnd]) => start > prevEnd || end < prevStart)) {
      ans.push([start, end])
    }
  }

  return ans.length >= k
}
