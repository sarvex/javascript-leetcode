/**
 * Constructs the longest possible string containing at most two consecutive identical characters
 *
 * @intuition
 * We can use a greedy approach by always selecting the character with the highest remaining count.
 * To prevent three consecutive identical characters, we need to track the consecutive count of each character.
 *
 * @approach
 * 1. Track consecutive counts for each character ('a', 'b', 'c')
 * 2. In each iteration, choose the character with the highest remaining count that hasn't appeared twice consecutively
 * 3. If a character appears twice consecutively, choose the next highest count character
 * 4. Continue until no more characters can be added
 * 5. Build the result as we go by appending characters to an array and joining at the end
 *
 * @complexity
 * Time: O(n) where n is the total number of characters (a + b + c)
 * Space: O(n) for the result array
 *
 * @param {number} a - Count of 'a' characters available
 * @param {number} b - Count of 'b' characters available
 * @param {number} c - Count of 'c' characters available
 * @return {string} - The longest happy string that can be built
 */
const longestDiverseString = (a, b, c) => {
  let countA = 0
  let countB = 0
  let countC = 0
  const result = []

  while (a > 0 || b > 0 || c > 0) {
    // Choose 'a' if it has the highest count and hasn't appeared twice consecutively
    // OR if another character has appeared twice consecutively and 'a' is available
    if ((a >= b && a >= c && countA < 2) || 
        (countB === 2 && a > 0) || 
        (countC === 2 && a > 0)) {
      result.push('a')
      countA += 1
      a -= 1
      // Reset other character counts since we're no longer using consecutive of those
      countB = 0
      countC = 0
    } 
    // Choose 'b' if it has the highest count and hasn't appeared twice consecutively
    // OR if another character has appeared twice consecutively and 'b' is available
    else if ((b >= a && b >= c && countB < 2) || 
             (countA === 2 && b > 0) || 
             (countC === 2 && b > 0)) {
      result.push('b')
      countB += 1
      b -= 1
      // Reset other character counts
      countA = 0
      countC = 0
    } 
    // Choose 'c' if it has the highest count and hasn't appeared twice consecutively
    // OR if another character has appeared twice consecutively and 'c' is available
    else if ((c >= a && c >= b && countC < 2) || 
             (countA === 2 && c > 0) || 
             (countB === 2 && c > 0)) {
      result.push('c')
      countC += 1
      c -= 1
      // Reset other character counts
      countA = 0
      countB = 0
    } 
    // If no character can be added without violating the constraints, break
    else {
      break
    }
  }

  return result.join('')
}
