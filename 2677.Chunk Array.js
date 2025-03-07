/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array[]}
 */
const chunk = (arr, size) => {
  const result = []
  for (let i = 0, n = arr.length; i < n; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}
