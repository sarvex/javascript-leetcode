/**
 * One-pass counter approach
 *
 * @intuition first thoughts: iterate once, maintain running count of consecutive odd numbers, reset on even
 * @approach use a simple for-of loop and counter; return true when counter reaches three
 * @complexity
 *  time O(n)
 *  space O(1)
 *
 * @param {number[]} arr input array of integers
 * @returns {boolean} true if three consecutive odd numbers exist
 */
const threeConsecutiveOdds = (arr) => {
  let count = 0
  for (const n of arr) {
    if (n % 2 === 1) {
      count++
      if (count === 3) {
        return true
      }
    } else {
      count = 0
    }
  }
  return false
}
