/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
const getHappyString = (n, k) => {
  let len = n
  let chars = ['a', 'b', 'c']

  function search(prefix, n, k) {
    if (!n) {
      return prefix
    }

    for (let char of chars) {
      if (prefix.length && char === prefix[prefix.length - 1]) {
        continue
      }

      let count = 2 ** (len - prefix.length - 1)

      if (count >= k) {
        return search(prefix + char, n - 1, k)
      } else {
        k -= count
      }
    }

    return ''
  }

  return search('', n, k)
}
