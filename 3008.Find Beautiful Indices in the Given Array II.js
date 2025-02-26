/**
 * @param {string} s
 * @param {string} a
 * @param {string} b
 * @param {number} k
 * @return {number[]}
 */
const beautifulIndices = (s, a, b, k) => {
  // Find all occurrences of pattern a and b using KMP algorithm
  const aIndices = findPatternIndices(s, a)
  const bIndices = findPatternIndices(s, b)

  const result = []

  // For each index where 'a' is found, check if there's a 'b' within distance k
  for (const i of aIndices) {
    // Binary search to find the closest index in bIndices
    if (hasCloseIndex(bIndices, i, k)) {
      result.push(i)
    }
  }

  return result
}

/**
 * Finds all occurrences of a pattern in a string using KMP algorithm
 * @param {string} s - The string to search in
 * @param {string} pattern - The pattern to find
 * @return {number[]} - Array of starting indices where pattern is found
 */
function findPatternIndices(s, pattern) {
  const indices = []
  if (pattern.length > s.length) return indices

  // Compute the LPS (Longest Prefix Suffix) array for the pattern
  const lps = computeLPSArray(pattern)

  let i = 0 // index for s
  let j = 0 // index for pattern

  while (i < s.length) {
    // Current characters match, move both pointers
    if (pattern[j] === s[i]) {
      i++
      j++
    }

    // Found a complete match
    if (j === pattern.length) {
      indices.push(i - j) // Add the starting index of the match
      j = lps[j - 1] // Look for the next match
    }
    // Mismatch after j matches
    else if (i < s.length && pattern[j] !== s[i]) {
      // Do not match lps[0..lps[j-1]] characters, they will match anyway
      if (j !== 0) {
        j = lps[j - 1]
      } else {
        i++
      }
    }
  }

  return indices
}

/**
 * Computes the LPS (Longest Prefix Suffix) array for KMP algorithm
 * @param {string} pattern - The pattern to analyze
 * @return {number[]} - The LPS array
 */
function computeLPSArray(pattern) {
  const lps = new Array(pattern.length).fill(0)
  let length = 0
  let i = 1

  while (i < pattern.length) {
    if (pattern[i] === pattern[length]) {
      length++
      lps[i] = length
      i++
    } else if (length !== 0) {
        length = lps[length - 1]
      } else {
        lps[i] = 0
        i++
      }
  }

  return lps
}

/**
 * Checks if there's an index in the array that is within distance k from target
 * @param {number[]} indices - Sorted array of indices
 * @param {number} target - Target index
 * @param {number} k - Maximum allowed distance
 * @return {boolean} - True if such an index exists
 */
function hasCloseIndex(indices, target, k) {
  if (indices.length === 0) return false

  // Binary search to find the insertion point
  let left = 0
  let right = indices.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    // Check if this index is within distance k
    if (Math.abs(indices[mid] - target) <= k) {
      return true
    }

    // Decide which half to search next
    if (indices[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  // Check the two closest indices (if they exist)
  if (left < indices.length && Math.abs(indices[left] - target) <= k) {
    return true
  }

  return !!(right >= 0 && Math.abs(indices[right] - target) <= k);
}
