/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
const flat = (arr, n) => {
  let result = []

  const flatten = (array, size) => {
    if (!size) return array
    for (const element of array) {
      if (Array.isArray(element) && size !== 0) {
        flatten(element, size - 1)
      } else {
        result.push(element)
      }
    }
  }

  flatten(arr, n)

  return result
}
