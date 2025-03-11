/**
 * Parses a boolean expression string and evaluates it to a boolean result
 *
 * @intuition
 * We can use an iterative approach with two stacks to track operators and operands.
 * This avoids recursion overhead and handles nested expressions efficiently.
 *
 * @approach
 * 1. Use a stack for operators (&, |, !) and another for operands/parentheses
 * 2. Process each character in the expression sequentially
 * 3. When encountering a closing parenthesis, evaluate the expression inside
 * 4. Apply the appropriate logical operation based on the operator
 *
 * @param {string} expression - The boolean expression to parse
 * @return {boolean} - The evaluated result of the expression
 *
 * @complexity
 * Time: O(n) where n is the length of the expression string
 * Space: O(n) for the stacks in worst case
 */
const parseBoolExpr = (expression) => {
  const operators = []
  const values = []

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i]

    if (char === '&' || char === '|' || char === '!') {
      operators.push(char)
    } else if (char === ')') {
      let result = values.pop()
      const operator = operators.pop()

      while (values.length && values[values.length - 1] !== '(') {
        const value = values.pop()
        result = operator === '&' ? result && value : result || value
      }

      values.pop()

      if (operator === '!') {
        result = !result
      }

      values.push(result)
    } else if (char !== ',' && char !== '(') {
      values.push(char === 't')
    } else if (char === '(') {
      values.push(char)
    }
  }

  return values[0]
}
