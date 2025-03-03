/**
 * Constructs a string with a repeat limit for consecutive characters.
 *
 * Problem 2182: Construct the lexicographically largest string possible where
 * no character appears more than repeatLimit times in a row.
 *
 * Time Complexity: O(n), where n is the length of the input string
 * Space Complexity: O(1), fixed-size array for character counts
 *
 * @param {string} s - The input string
 * @param {number} repeatLimit - Maximum number of times a character can appear consecutively
 * @return {string} - The lexicographically largest string possible with the repeat limit
 */
const repeatLimitedString = (s, repeatLimit) => {
  const ALPHABETS = 26
  const ASCII = 97
  const characterCounts = new Array(ALPHABETS).fill(0)

  for (const character of s) {
    const characterCode = character.charCodeAt(0) - ASCII
    characterCounts[characterCode]++
  }

  let currentCharacterIndex = ALPHABETS - 1
  let nextCharacterIndex = ALPHABETS - 2
  let result = ''

  while (currentCharacterIndex >= 0) {
    if (characterCounts[currentCharacterIndex] === 0) {
      currentCharacterIndex--
      continue
    }

    nextCharacterIndex = Math.min(nextCharacterIndex, currentCharacterIndex - 1)

    while (nextCharacterIndex >= 0 && characterCounts[nextCharacterIndex] === 0) {
      nextCharacterIndex--
    }

    const currentCharacter = String.fromCharCode(currentCharacterIndex + ASCII)
    const currentCharacterCount = characterCounts[currentCharacterIndex]

    if (currentCharacterCount <= repeatLimit) {
      result += currentCharacter.repeat(currentCharacterCount)
      characterCounts[currentCharacterIndex] = 0
      currentCharacterIndex--
    } else {
      if (nextCharacterIndex >= 0) {
        result += currentCharacter.repeat(repeatLimit)
        characterCounts[currentCharacterIndex] -= repeatLimit

        const nextCharacter = String.fromCharCode(nextCharacterIndex + ASCII)
        result += nextCharacter
        characterCounts[nextCharacterIndex]--

        if (characterCounts[nextCharacterIndex] === 0) {
          nextCharacterIndex--
        }
      } else {
        result += currentCharacter.repeat(repeatLimit)
        currentCharacterIndex--
      }
    }
  }

  return result
}
