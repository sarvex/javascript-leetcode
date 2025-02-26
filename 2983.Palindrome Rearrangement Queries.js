/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {boolean[]}
 */
const canMakePalindromeQueries = (s, queries) => {
  const stringLength = s.length
  const halfLength = stringLength >> 1
  
  // Avoid unnecessary split operations
  const firstHalf = new Array(halfLength)
  const secondHalfReversed = new Array(halfLength)
  
  for (let i = 0; i < halfLength; ++i) {
    firstHalf[i] = s.charCodeAt(i) - 97 // Store character codes directly
    secondHalfReversed[i] = s.charCodeAt(stringLength - 1 - i) - 97
  }

  // Track differences between corresponding positions in both halves
  const cumulativeDifferences = new Int32Array(halfLength)
  for (let i = 0; i < halfLength; ++i) {
    cumulativeDifferences[i] = firstHalf[i] !== secondHalfReversed[i] ? 1 : 0
  }
  
  // Calculate prefix sum of differences
  for (let i = 1; i < halfLength; ++i) {
    cumulativeDifferences[i] += cumulativeDifferences[i - 1]
  }

  // Precompute frequency arrays for faster lookups
  const firstHalfPrefixFrequencies = new Array(halfLength)
  const secondHalfPrefixFrequencies = new Array(halfLength)
  
  // Initialize first frequency arrays
  firstHalfPrefixFrequencies[0] = new Int32Array(26)
  secondHalfPrefixFrequencies[0] = new Int32Array(26)
  
  // Set initial values
  firstHalfPrefixFrequencies[0][firstHalf[0]] = 1
  secondHalfPrefixFrequencies[0][secondHalfReversed[0]] = 1
  
  // Build prefix frequency arrays for both halves
  for (let i = 1; i < halfLength; ++i) {
    // Create new arrays by copying previous ones
    firstHalfPrefixFrequencies[i] = new Int32Array(26)
    secondHalfPrefixFrequencies[i] = new Int32Array(26)
    
    // Copy previous values
    for (let j = 0; j < 26; ++j) {
      firstHalfPrefixFrequencies[i][j] = firstHalfPrefixFrequencies[i-1][j]
      secondHalfPrefixFrequencies[i][j] = secondHalfPrefixFrequencies[i-1][j]
    }
    
    // Increment current character count
    ++firstHalfPrefixFrequencies[i][firstHalf[i]]
    ++secondHalfPrefixFrequencies[i][secondHalfReversed[i]]
  }

  // Reuse arrays for frequency differences to reduce memory allocations
  const tempArray1 = new Int32Array(26)
  const tempArray2 = new Int32Array(26)
  
  // Process each query
  return queries.map(([leftStart, leftEnd, rightStart, rightEnd]) => {
    // Map second half indices to first half equivalent positions
    const rightStartMirrored = stringLength - rightEnd - 1
    const rightEndMirrored = stringLength - rightStart - 1
    
    // For clarity, rename variables
    const a = leftStart
    const b = leftEnd
    const c = rightStartMirrored
    const d = rightEndMirrored

    // Check non-covered parts
    // Left gap - characters before both query ranges
    if (Math.min(a, c) > 0 && cumulativeDifferences[Math.min(a, c) - 1] !== 0) {
      return false
    }

    // Right gap - characters after both query ranges
    if (
      Math.max(b, d) < halfLength - 1 &&
      cumulativeDifferences[Math.max(b, d)] !== cumulativeDifferences[halfLength - 1]
    ) {
      return false
    }

    // Middle gap case 1 - characters between left and right ranges
    if (b < c && cumulativeDifferences[b] !== cumulativeDifferences[c - 1]) {
      return false
    }

    // Middle gap case 2 - characters between right and left ranges
    if (d < a && cumulativeDifferences[d] !== cumulativeDifferences[a - 1]) {
      return false
    }

    // Get character frequencies for the query ranges using our reusable arrays
    calculateRangeFrequencies(
      firstHalfPrefixFrequencies, 
      a, 
      b, 
      tempArray1
    )
    
    calculateRangeFrequencies(
      secondHalfPrefixFrequencies, 
      c, 
      d, 
      tempArray2
    )

    // Handle overlapping regions between query ranges
    
    // Left side extra on string 1
    if (c > a) {
      const overlapEnd = Math.min(b, c - 1)
      subtractOverlappingFrequencies(
        secondHalfPrefixFrequencies,
        a,
        overlapEnd,
        tempArray1
      )
    }

    // Right side extra on string 1
    if (b > d) {
      const overlapStart = Math.max(a - 1, d)
      subtractNonOverlappingFrequencies(
        secondHalfPrefixFrequencies,
        overlapStart,
        b,
        tempArray1
      )
    }

    // Left side extra on string 2
    if (a > c) {
      const overlapEnd = Math.min(d, a - 1)
      subtractOverlappingFrequencies(
        firstHalfPrefixFrequencies,
        c,
        overlapEnd,
        tempArray2
      )
    }

    // Right side extra on string 2
    if (d > b) {
      const overlapStart = Math.max(c - 1, b)
      subtractNonOverlappingFrequencies(
        firstHalfPrefixFrequencies,
        overlapStart,
        d,
        tempArray2
      )
    }

    // Check if character frequencies match and are non-negative
    for (let i = 0; i < 26; ++i) {
      if (tempArray1[i] !== tempArray2[i] || tempArray1[i] < 0) {
        return false
      }
    }
    return true
  })
}

/**
 * Calculate frequency differences for a range and store in resultArray
 * @param {Array<Int32Array>} prefixFrequencies - Prefix frequency arrays
 * @param {number} start - Start index
 * @param {number} end - End index
 * @param {Int32Array} resultArray - Array to store results
 */
const calculateRangeFrequencies = (prefixFrequencies, start, end, resultArray) => {
  // Reset the result array
  for (let i = 0; i < 26; ++i) {
    resultArray[i] = 0
  }
  
  // If start is 0, just copy the end frequencies
  if (start === 0) {
    for (let i = 0; i < 26; ++i) {
      resultArray[i] = prefixFrequencies[end][i]
    }
    return
  }
  
  // Calculate the difference between end and start-1
  for (let i = 0; i < 26; ++i) {
    resultArray[i] = prefixFrequencies[end][i] - prefixFrequencies[start - 1][i]
  }
}

/**
 * Subtract overlapping frequencies from the result array
 * @param {Array<Int32Array>} prefixFrequencies - Prefix frequency arrays
 * @param {number} start - Start index
 * @param {number} end - End index
 * @param {Int32Array} resultArray - Array to update
 */
const subtractOverlappingFrequencies = (prefixFrequencies, start, end, resultArray) => {
  if (start === 0) {
    // Subtract all frequencies in the range
    for (let i = 0; i < 26; ++i) {
      resultArray[i] -= prefixFrequencies[end][i]
    }
    return
  }
  
  // Subtract the difference between end and start-1
  for (let i = 0; i < 26; ++i) {
    resultArray[i] -= (prefixFrequencies[end][i] - prefixFrequencies[start - 1][i])
  }
}

/**
 * Subtract non-overlapping frequencies from the result array
 * @param {Array<Int32Array>} prefixFrequencies - Prefix frequency arrays
 * @param {number} start - Start index
 * @param {number} end - End index
 * @param {Int32Array} resultArray - Array to update
 */
const subtractNonOverlappingFrequencies = (prefixFrequencies, start, end, resultArray) => {
  for (let i = 0; i < 26; ++i) {
    resultArray[i] -= (prefixFrequencies[end][i] - prefixFrequencies[start][i])
  }
}
