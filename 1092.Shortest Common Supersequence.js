/**
 * Finds the shortest common supersequence of two strings.
 * A supersequence is a string that contains both input strings as subsequences.
 *
 * @param {string} str1 - The first input string
 * @param {string} str2 - The second input string
 * @return {string} The shortest common supersequence
 */
const shortestCommonSupersequence = (str1, str2) => {
  // Get the lengths of both strings
  const length1 = str1.length
  const length2 = str2.length

  // Create a DP table to store the length of longest common subsequence
  // for different subproblems
  const lcsTable = new Array(length1 + 1).fill(0).map(() => new Array(length2 + 1).fill(0))

  // Fill the lcsTable in bottom-up fashion
  for (let i = 1; i <= length1; ++i) {
    for (let j = 1; j <= length2; ++j) {
      // If characters match, increment the LCS length diagonally
      if (str1[i - 1] === str2[j - 1]) {
        lcsTable[i][j] = lcsTable[i - 1][j - 1] + 1
      } else {
        // If characters don't match, take the maximum from left or top
        lcsTable[i][j] = Math.max(lcsTable[i - 1][j], lcsTable[i][j - 1])
      }
    }
  }

  // Construct the shortest common supersequence
  const resultChars = []
  let i = length1
  let j = length2

  // Traverse the lcsTable from bottom right to top left
  while (i > 0 || j > 0) {
    if (i === 0) {
      // If we've processed all characters of str1, add remaining chars from str2
      resultChars.push(str2[--j])
    } else if (j === 0) {
      // If we've processed all characters of str2, add remaining chars from str1
      resultChars.push(str1[--i])
    } else {
      // If current character of str1 is not part of LCS, add it to result
      if (lcsTable[i][j] === lcsTable[i - 1][j]) {
        resultChars.push(str1[--i])
      }
      // If current character of str2 is not part of LCS, add it to result
      else if (lcsTable[i][j] === lcsTable[i][j - 1]) {
        resultChars.push(str2[--j])
      }
      // If current character is part of LCS, add it once and move diagonally
      else {
        resultChars.push(str1[--i])
        --j
      }
    }
  }

  // Reverse the result and join to get the final string
  return resultChars.toReversed().join('')
}
