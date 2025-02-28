/**
 * Finds the maximum difference between odd and even frequency characters in a substring of length at least k
 * 
 * @param {string} s - The input string consisting of digits '0' to '4'
 * @param {number} k - The minimum length of the substring to consider
 * @return {number} - The maximum difference between odd and even frequency characters
 * 
 * Time Complexity: O(n), where n is the length of the string
 * Space Complexity: O(n), for the prefix sums and closest right arrays
 */
const maxDifference = (s, k) => {
  const stringLength = s.length
  
  // Create prefix sum arrays to track frequency of each digit (0-4) up to each position
  const prefixSums = Array(5).fill().map(() => Array(stringLength).fill(0))
  
  // Track the closest occurrence of each digit to the right of each position
  const closestRightOccurrence = Array(5).fill().map(() => Array(stringLength).fill(stringLength))
  
  // Calculate prefix sums and closest right occurrences for each digit (0-4)
  for (let digit = 0; digit < 5; digit++) {
    // Calculate prefix sums (cumulative count of each digit)
    for (let position = 0; position < stringLength; position++) {
      const currentDigit = s[position] - '0'
      // Add 1 if current digit matches the digit we're tracking
      prefixSums[digit][position] = (currentDigit === digit) ? 1 : 0
      // Add the previous count to get cumulative sum
      if (position > 0) {
        prefixSums[digit][position] += prefixSums[digit][position - 1]
      }
    }
    
    // Calculate closest right occurrence of each digit
    for (let position = stringLength - 1; position >= 0; position--) {
      const currentDigit = s[position] - '0'
      // Inherit the closest occurrence from the right
      if (position < stringLength - 1) {
        closestRightOccurrence[digit][position] = closestRightOccurrence[digit][position + 1]
      }
      // Update if current position has the digit we're tracking
      if (currentDigit === digit) {
        closestRightOccurrence[digit][position] = position
      }
    }
  }
  
  let maxDifferenceFound = Number.MIN_SAFE_INTEGER
  
  /**
   * Calculate the maximum difference between frequencies of oddDigit and evenDigit
   * where oddDigit has odd frequency and evenDigit has even frequency
   */
  const findMaxDifference = (oddDigit, evenDigit) => {
    // Track the maximum difference for each combination of parities
    // suf[oddParity][evenParity][position] = max difference for substring ending at position
    // with oddDigit having oddParity and evenDigit having evenParity
    const suffixMaxDifference = Array(2).fill().map(() => 
      Array(2).fill().map(() => 
        Array(stringLength).fill(Number.MIN_SAFE_INTEGER)
      )
    )
    
    // Calculate the difference for each ending position
    for (let endPosition = 0; endPosition < stringLength; endPosition++) {
      // Determine if the frequency of each digit is odd or even
      const oddDigitParity = prefixSums[oddDigit][endPosition] % 2
      const evenDigitParity = prefixSums[evenDigit][endPosition] % 2
      
      // Only consider if both digits appear in the substring
      if (prefixSums[oddDigit][endPosition] > 0 && prefixSums[evenDigit][endPosition] > 0) {
        // Calculate the difference between frequencies
        suffixMaxDifference[oddDigitParity][evenDigitParity][endPosition] = 
          prefixSums[oddDigit][endPosition] - prefixSums[evenDigit][endPosition]
      }
    }
    
    // Calculate suffix maximums for each parity combination
    // This allows us to efficiently find the maximum difference for any substring
    for (let oddParity = 0; oddParity < 2; oddParity++) {
      for (let evenParity = 0; evenParity < 2; evenParity++) {
        for (let endPosition = stringLength - 2; endPosition >= 0; endPosition--) {
          suffixMaxDifference[oddParity][evenParity][endPosition] = Math.max(
            suffixMaxDifference[oddParity][evenParity][endPosition],
            suffixMaxDifference[oddParity][evenParity][endPosition + 1]
          )
        }
      }
    }
    
    // Find the maximum difference for all valid substrings
    let maxDiffForDigitPair = Number.MIN_SAFE_INTEGER
    
    // Try each possible starting position
    for (let startPosition = 0; startPosition < stringLength; startPosition++) {
      // Ensure the substring has at least length k
      const minEndPosition = startPosition + k - 1
      if (minEndPosition >= stringLength) break
      
      // Calculate frequencies before the starting position
      const oddDigitFreqBeforeStart = (startPosition === 0) ? 0 : prefixSums[oddDigit][startPosition - 1]
      const evenDigitFreqBeforeStart = (startPosition === 0) ? 0 : prefixSums[evenDigit][startPosition - 1]
      
      // Determine the target parities
      // We want oddDigit to have odd frequency and evenDigit to have even frequency
      // in the substring from startPosition to endPosition
      const targetOddParity = (oddDigitFreqBeforeStart + 1) % 2  // +1 to make it odd
      const targetEvenParity = evenDigitFreqBeforeStart % 2       // keep it even
      
      // Find the minimum valid end position
      // It must be at least k characters from start and must include both digits
      const queryPosition = Math.max(
        minEndPosition,
        closestRightOccurrence[oddDigit][startPosition],
        closestRightOccurrence[evenDigit][startPosition]
      )
      
      // Skip if no valid end position exists
      if (queryPosition >= stringLength) continue
      
      // Get the maximum difference for this substring
      const maxDiffValue = suffixMaxDifference[targetOddParity][targetEvenParity][queryPosition]
      if (maxDiffValue === Number.MIN_SAFE_INTEGER) continue
      
      // Adjust the difference to account for characters before the starting position
      const adjustedDiff = maxDiffValue - oddDigitFreqBeforeStart + evenDigitFreqBeforeStart
      maxDiffForDigitPair = Math.max(maxDiffForDigitPair, adjustedDiff)
    }
    
    return maxDiffForDigitPair
  }
  
  // Try all pairs of different digits
  for (let firstDigit = 0; firstDigit <= 4; firstDigit++) {
    for (let secondDigit = 0; secondDigit <= 4; secondDigit++) {
      if (firstDigit !== secondDigit) {
        // Calculate max difference with firstDigit having odd frequency
        // and secondDigit having even frequency
        maxDifferenceFound = Math.max(maxDifferenceFound, findMaxDifference(firstDigit, secondDigit))
      }
    }
  }
  
  // Return -1 if no valid substring was found
  return maxDifferenceFound === Number.MIN_SAFE_INTEGER ? -1 : maxDifferenceFound
}
