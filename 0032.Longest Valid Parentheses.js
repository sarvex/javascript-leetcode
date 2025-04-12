/**
 * Stack-based - Track indices of unmatched parentheses
 *
 * @intuition
 * We can use a stack to keep track of the indices of unmatched parentheses.
 * By storing indices rather than characters, we can calculate the length of valid
 * subsequences by finding the difference between the current position and the
 * position of the last unmatched parenthesis.
 *
 * @approach
 * - Initialize a stack with -1 (serves as a base index for calculations)
 * - For each character in the string:
 *   - If '(': push its index onto the stack
 *   - If ')':
 *     - Pop the top element (matching '(' or base index)
 *     - If stack becomes empty, push current index as new base
 *     - Otherwise, calculate valid length as (current index - top of stack)
 * - Track the maximum valid length encountered
 *
 * @complexity
 * Time complexity: O(n) where n is the length of the string
 * Space complexity: O(n) in worst case when all characters are '('
 *
 * @param {string} s - String containing only '(' and ')' characters
 * @return {number} - Length of the longest valid parentheses substring
 */
const longestValidParentheses = (s) => {
  let maxLength = 0
  const stack = [-1] // Initialize with -1 as base index for length calculation

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i) // Store index of opening parenthesis
    } else {
      stack.pop() // Remove matching '(' or base index

      if (stack.length === 0) {
        stack.push(i) // Use current index as new base for future calculations
      } else {
        // Calculate length of valid sequence ending at current position
        const currentLength = i - stack[stack.length - 1]
        maxLength = Math.max(maxLength, currentLength)
      }
    }
  }

  return maxLength
}
