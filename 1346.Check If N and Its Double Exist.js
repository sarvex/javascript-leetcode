/**
 * Checks if the array contains an element and its double.
 *
 * @param {number[]} numbers - The numbers to check.
 * @return {boolean} - True if such a pair exists, false otherwise.
 */
const checkIfExist = (numbers) => {
  const observedNumbers = new Set()
  for (const num of numbers) {
    if (observedNumbers.has(num * 2) || (num % 2 === 0 && observedNumbers.has(num / 2))) {
      return true
    }
    observedNumbers.add(num)
  }
  return false
}
