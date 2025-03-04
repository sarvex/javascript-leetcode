/**
 * Check if target can be formed as a subsequence of source with cyclic increments.
 * @param {string} source - The original string.
 * @param {string} target - Subsequence to form.
 * @return {boolean} True if target can be formed, else false.
 */
const canMakeSubsequence = (source, target) => {
  let [sourceIndex, targetIndex] = [0, 0]
  const [sourceLength, targetLength] = [source.length,target.length]

  const getCyclicIncrementedChar = (char) =>
    String.fromCharCode(((char.charCodeAt(0) - 96) % 26) + 97)

  while (sourceIndex < sourceLength && targetIndex < targetLength) {
    if (
      source[sourceIndex] === target[targetIndex] ||
      getCyclicIncrementedChar(source[sourceIndex]) === target[targetIndex]
    )
      targetIndex++
    sourceIndex++
  }
  return targetIndex === targetLength
}
