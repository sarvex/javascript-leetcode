/**
 * @param {number} n
 * @return {boolean}
 */
const checkPowersOfThree = (n) => {
  while (n) {
    if (n % 3 > 1) return false
    n = Math.floor(n / 3)
  }
  return true
}
