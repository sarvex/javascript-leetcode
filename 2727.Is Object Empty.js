/**
 * @param {Object | Array} obj
 * @return {boolean}
 */
const isEmpty = (obj) => {
  for (const _x in obj) {
    return false
  }
  return true
}
