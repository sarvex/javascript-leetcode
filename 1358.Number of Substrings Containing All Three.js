/**
 * @param {string} s
 * @return {number}
 *
 * @intuition
 * We need to count substrings containing all three characters (a, b, c).
 * Using a sliding window approach, we can track the last position of each character
 * and calculate valid substrings efficiently in a single pass.
 *
 * @approach
 * 1. Initialize a counter for each character (a, b, c) to -1 (not found)
 * 2. Iterate through the string, updating the last position of each character
 * 3. For each position, if all characters are present, the number of valid substrings
 *    ending at the current position equals the minimum last position of a, b, c plus 1
 * 4. This works because any substring starting after the minimum position and ending
 *    at the current position will contain all three characters
 *
 * @complexity
 * Time complexity: O(n) where n is the length of the string
 * Space complexity: O(1) as we only use constant extra space
 */
const numberOfSubstrings = (s) => {
  const ASCII = 97
  const n = s.length
  let result = 0
  const lastPos = [-1, -1, -1] // Last positions of a, b, c

  for (let i = 0; i < n; i++) {
    // Update the last position of current character (a=0, b=1, c=2)
    lastPos[s.charCodeAt(i) - ASCII] = i

    // If all characters are present, add valid substrings
    if (lastPos[0] !== -1 && lastPos[1] !== -1 && lastPos[2] !== -1) {
      // The minimum last position determines how many valid substrings end at current position
      // Adding 1 because array is 0-indexed
      result += Math.min(lastPos[0], lastPos[1], lastPos[2]) + 1
    }
  }

  return result
}
