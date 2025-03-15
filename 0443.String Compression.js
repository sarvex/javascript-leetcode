/**
 * Compresses a character array in-place using run-length encoding
 *
 * @intuition
 * We can iterate through the array once, keeping track of consecutive character counts.
 * When a different character is encountered, we write the previous character and its count (if > 1) to the array.
 *
 * @approach
 * 1. Use two pointers: read (i) to scan through the original array, and write (index) to place compressed characters
 * 2. For each character, count consecutive occurrences
 * 3. Write the character to the array at the write pointer
 * 4. If count > 1, convert count to string and write each digit to the array
 * 5. Return the final write pointer position as the new length
 *
 * @complexity
 * Time: O(n) where n is the length of the input array
 * Space: O(1) as we only use a constant amount of extra space
 *
 * @param {character[]} chars - Array of characters to compress
 * @return {number} - New length of the compressed array
 */
const compress = (chars) => {
  let write = 0
  let read = 0

  while (read < chars.length) {
    const currentChar = chars[read]
    let count = 0

    // Count consecutive occurrences of the current character
    while (read < chars.length && chars[read] === currentChar) {
      count++
      read++
    }

    // Write character
    chars[write++] = currentChar

    // Write count if greater than 1
    if (count > 1) {
      // Convert count to string and write each digit
      const countStr = count.toString()
      for (const digit of countStr) {
        chars[write++] = digit
      }
    }
  }

  return write // New length of the compressed array
}
