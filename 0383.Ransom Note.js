/**
 * Character Position Tracking
 * 
 * @intuition
 * Instead of using a frequency counter, we track the positions of each character
 * in the magazine and ensure we don't reuse the same position for multiple characters
 * in the ransom note.
 * 
 * @approach
 * 1. Create an object to track the last found position of each character
 * 2. For each character in the ransom note:
 *    a. Get the previous position of this character (or -1 if not found yet)
 *    b. Find the next occurrence of this character in the magazine after the previous position
 *    c. If not found, return false
 * 3. If all characters are found, return true
 * 
 * @complexity
 * Time: O(n * m) where n is the length of ransomNote and m is the length of magazine
 * Space: O(k) where k is the number of unique characters in ransomNote
 * 
 * @param {string} ransomNote - The ransom note to construct
 * @param {string} magazine - The magazine containing characters
 * @return {boolean} - Whether the ransom note can be constructed from the magazine
 */
const canConstruct = (ransomNote, magazine) => {
  const positions = {};

  for (const char of ransomNote) {
    const startPos = positions[char] ?? -1;
    positions[char] = magazine.indexOf(char, Math.min(startPos + 1, magazine.length));

    if (positions[char] < 0) return false;
  }

  return true;
};
