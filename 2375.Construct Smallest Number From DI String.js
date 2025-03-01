/**
 * Constructs the smallest number that satisfies the given pattern.
 *
 * @param {string} pattern - A string consisting of only 'I' (increasing) and 'D' (decreasing) characters
 * @returns {string} The smallest number (as a string) that satisfies the pattern
 */
const smallestNumber = (pattern) => {
  const patternLength = pattern.length
  const result = new Array(patternLength + 1).fill('')
  const visited = new Array(patternLength + 1).fill(false)

  /**
   * Depth-first search to find the smallest valid permutation
   *
   * @param {number} index - Current position in the pattern
   * @param {number} currentDigit - Current digit being considered
   */
  const findSmallestValidPermutation = (index, currentDigit) => {
    if (index === patternLength) {
      return
    }

    if (visited[currentDigit]) {
      visited[currentDigit] = false
      if (pattern[index] === 'I') {
        findSmallestValidPermutation(index - 1, currentDigit - 1)
      } else {
        findSmallestValidPermutation(index - 1, currentDigit + 1)
      }
    return
    }

    visited[currentDigit] = true
    result[index] = currentDigit

    if (pattern[index] === 'I') {
      // For 'I', try to find the smallest available digit greater than the current one
      for (let nextDigit = result[index] + 1; nextDigit <= patternLength + 1; nextDigit++) {
        if (!visited[nextDigit]) {
          findSmallestValidPermutation(index + 1, nextDigit)
          return
        }
      }
      visited[currentDigit] = false
      findSmallestValidPermutation(index, currentDigit - 1)
    } else {
      // For 'D', try to find the largest available digit smaller than the current one
      for (let nextDigit = result[index] - 1; nextDigit > 0; nextDigit--) {
        if (!visited[nextDigit]) {
          findSmallestValidPermutation(index + 1, nextDigit)
          return
        }
      }
      visited[currentDigit] = false
      findSmallestValidPermutation(index, currentDigit + 1)
    }
  }

  // Start the search with digit 1
  findSmallestValidPermutation(0, 1)

  // Find the last remaining unvisited digit for the final position
  for (let digit = 1; digit <= patternLength + 1; digit++) {
    if (!visited[digit]) {
      result[patternLength] = digit
      break
    }
  }

  return result.join('')
}
