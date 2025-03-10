/**
 * @param {number[]} colors - Array of colors
 * @param {number} k - Minimum length of alternating group
 * @return {number} - Number of valid alternating groups
 */
const numberOfAlternatingGroups = (colors, k) => {
  for (let i = 0; i < k - 1; i++) {
    colors.push(colors[i])
  }

  let [result, consecutive] = [0, 1]

  for (let i = 1; i < colors.length; i++) {
    if (colors[i] !== colors[i - 1]) {
      consecutive++
    } else {
      consecutive = 1
    }

    if (consecutive >= k) {
      result++
    }
  }

  return result
}
