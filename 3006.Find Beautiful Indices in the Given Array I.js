/**
 * @param {string} s
 * @param {string} a
 * @param {string} b
 * @param {number} k
 * @return {number[]}
 */
const beautifulIndices = (s, a, b, k) => {
  // Find all occurrences of pattern in string
  const findOccurrences = (str, pattern) => {
    const indices = []
    let index = str.indexOf(pattern)

    while (index !== -1) {
      indices.push(index)
      index = str.indexOf(pattern, index + 1)
    }

    return indices
  }

  // Find all occurrences of both patterns
  const aIndices = findOccurrences(s, a)
  const bIndices = findOccurrences(s, b)

  const result = []

  // Two pointers approach
  let j = 0
  for (const i of aIndices) {
    // Move j pointer until we find a potential match
    while (j < bIndices.length && bIndices[j] < i - k) {
      j++
    }

    // Check if current j or previous j is within range
    if ((j < bIndices.length && Math.abs(bIndices[j] - i) <= k) || 
        (j > 0 && Math.abs(bIndices[j - 1] - i) <= k)) {
      result.push(i)
    }
  }

  return result
}
