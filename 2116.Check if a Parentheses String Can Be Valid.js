/**
 * Determines if a parentheses string can be made valid by changing unlocked characters.
 *
 * The approach uses a two-pass technique to validate the parentheses string:
 * 1. First pass (left to right): Count unmatched open parentheses, allowing flexibility for unlocked positions
 * 2. Second pass (right to left): Count unmatched close parentheses, allowing flexibility for unlocked positions
 *
 * If both passes succeed, the string can be made valid by appropriate substitutions.
 *
 * @param {string} s - The parentheses string to validate
 * @param {string} locked - Binary string indicating which characters are locked (1) or can be changed (0)
 * @return {boolean} True if s can be made into a valid parentheses string, false otherwise
 *
 * Time Complexity: O(n) where n is the length of the input strings
 * Space Complexity: O(1) as we only use a constant amount of extra space
 */
const canBeValid = (s, locked) => {
  // If the string length is odd, it can never be valid
  if (s.length % 2 !== 0) {
    return false
  }

  // First pass: left to right, ensuring we can balance all closing parentheses
  let availableToChange = 0
  let openParentheses = 0

  for (let i = 0; i < s.length; i++) {
    // Current character is unlocked and can be changed
    if (locked[i] === '0') {
      availableToChange++
    }
    // Current character is a locked open parenthesis
    else if (s[i] === '(') {
      openParentheses++
    }
    // Current character is a locked closing parenthesis
    else {
      if (openParentheses > 0) {
        // Use an existing open parenthesis to match this closing one
        openParentheses--
      } else if (availableToChange > 0) {
        // Change an unlocked character to an open parenthesis
        availableToChange--
      } else {
        // Cannot match this closing parenthesis
        return false
      }
    }
  }

  // Reset counters for second pass
  availableToChange = 0
  let closeParentheses = 0

  // Second pass: right to left, ensuring we can balance all opening parentheses
  for (let i = s.length - 1; i >= 0; i--) {
    // Current character is unlocked and can be changed
    if (locked[i] === '0') {
      availableToChange++
    }
    // Current character is a locked closing parenthesis
    else if (s[i] === ')') {
      closeParentheses++
    }
    // Current character is a locked opening parenthesis
    else {
      if (closeParentheses > 0) {
        // Use an existing close parenthesis to match this open one
        closeParentheses--
      } else if (availableToChange > 0) {
        // Change an unlocked character to a close parenthesis
        availableToChange--
      } else {
        // Cannot match this opening parenthesis
        return false
      }
    }
  }

  // If we've made it through both passes, the string can be made valid
  return true
}
