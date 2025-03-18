/**
 * @param {string} constraintString - Constraint string with 'T' and 'F' characters
 * @param {string} patternString - Pattern string to match or avoid
 * @return {string} - Lexicographically smallest string satisfying all constraints
 *
 * @intuition
 * First handle all 'T' constraints by placing the pattern at those positions.
 * Then fill remaining positions with 'a' (lexicographically smallest).
 * Finally check all 'F' constraints and try to modify one character to 'b' if needed.
 *
 * @approach
 * 1. Process all 'T' constraints by placing patternString at those positions
 * 2. Fill all remaining positions with 'a' (lexicographically smallest character)
 * 3. Check all 'F' constraints - if any substring matches patternString, try to modify
 *    one non-forced character to 'b'
 * 4. If no modification is possible, return empty string
 *
 * @complexity
 * Time: O(n * m) where n is length of constraintString and m is length of patternString
 * Space: O(n + m) for the result array and forced flags
 */
const lexicographicallySmallestString = (constraintString, patternString) => {
  const constraintLength = constraintString.length
  const patternLength = patternString.length
  const resultLength = constraintLength + patternLength - 1
  const emptyPlaceholder = '*'

  // Initialize result array and tracking for forced positions
  const resultArray = Array(resultLength).fill(emptyPlaceholder)
  const isPositionForced = Array(resultLength).fill(false)

  const processTrueConstraints = () => {
    for (let constraintIndex = 0; constraintIndex < constraintLength; constraintIndex++) {
      if (constraintString[constraintIndex] !== 'T') continue

      for (let patternIndex = 0; patternIndex < patternLength; patternIndex++) {
        const resultPosition = constraintIndex + patternIndex
        const patternChar = patternString[patternIndex]

        if (resultArray[resultPosition] === emptyPlaceholder) {
          resultArray[resultPosition] = patternChar
          isPositionForced[resultPosition] = true
        } else if (resultArray[resultPosition] !== patternChar) {
          // Conflict with previous 'T' constraint
          return false
        }
      }
    }
    return true
  }

  const fillRemainingPositions = () => {
    for (let position = 0; position < resultLength; position++) {
      if (resultArray[position] === emptyPlaceholder) {
        resultArray[position] = 'a'
      }
    }
  }

  const isWindowMatchingPattern = startPosition => {
    for (let patternIndex = 0; patternIndex < patternLength; patternIndex++) {
      if (resultArray[startPosition + patternIndex] !== patternString[patternIndex]) {
        return false
      }
    }
    return true
  }

  const modifyOneCharacter = startPosition => {
    // Try to modify from right to left (to maintain lexicographical order)
    for (let offset = patternLength - 1; offset >= 0; offset--) {
      const positionToModify = startPosition + offset
      if (!isPositionForced[positionToModify]) {
        resultArray[positionToModify] = 'b'
        return true
      }
    }
    return false
  }

  const handleFalseConstraints = () => {
    for (let constraintIndex = 0; constraintIndex < constraintLength; constraintIndex++) {
      if (constraintString[constraintIndex] !== 'F') continue

      // Check if current window matches patternString
      if (!isWindowMatchingPattern(constraintIndex)) continue

      // Try to modify one non-forced character
      if (!modifyOneCharacter(constraintIndex)) {
        return false
      }
    }
    return true
  }

  // Process all 'T' constraints first
  if (!processTrueConstraints()) {
    return ''
  }

  fillRemainingPositions()

  if (!handleFalseConstraints()) {
    return ''
  }

  return resultArray.join('')
}
