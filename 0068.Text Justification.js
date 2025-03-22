/**
 * Greedy Line Filling
 * 
 * @intuition
 * We need to pack words into lines with specific justification rules. The approach is to
 * greedily fill each line with as many words as possible, then apply the justification rules.
 * 
 * @approach
 * 1. Iterate through the words array, greedily filling each line
 * 2. For each line, calculate the number of spaces needed between words
 * 3. Handle three special cases:
 *    - Last line (left-justified with spaces at the end)
 *    - Lines with only one word (left-justified with spaces at the end)
 *    - Normal lines (fully justified with spaces distributed evenly)
 * 4. For normal lines, distribute spaces evenly with extra spaces going to the left gaps
 * 
 * @complexity
 * Time: O(n) where n is the total number of characters across all words
 * Space: O(n) for storing the result
 * 
 * @param {string[]} words - Array of words to be justified
 * @param {number} maxWidth - Maximum width of each line
 * @return {string[]} Array of justified text lines
 */
const fullJustify = (words, maxWidth) => {
  const result = [];
  
  for (let i = 0, n = words.length; i < n;) {
    // Start a new line with the current word
    const currentLine = [words[i]];
    let lineLength = words[i++].length;
    
    // Greedily add words to the current line
    while (i < n && lineLength + 1 + words[i].length <= maxWidth) {
      currentLine.push(words[i]);
      lineLength += 1 + words[i++].length;
    }
    
    // Handle special cases: last line or line with only one word
    if (i === n || currentLine.length === 1) {
      const leftJustified = currentLine.join(' ');
      const padding = ' '.repeat(maxWidth - leftJustified.length);
      result.push(leftJustified + padding);
      continue;
    }
    
    // Calculate space distribution for normal lines
    const totalSpaces = maxWidth - (lineLength - currentLine.length + 1);
    const spacesPerGap = Math.floor(totalSpaces / (currentLine.length - 1));
    const extraSpaces = totalSpaces % (currentLine.length - 1);
    
    // Construct the justified line
    const formattedLine = [];
    for (let j = 0; j < currentLine.length - 1; ++j) {
      formattedLine.push(currentLine[j]);
      formattedLine.push(' '.repeat(spacesPerGap + (j < extraSpaces ? 1 : 0)));
    }
    formattedLine.push(currentLine[currentLine.length - 1]);
    
    result.push(formattedLine.join(''));
  }
  
  return result;
};
