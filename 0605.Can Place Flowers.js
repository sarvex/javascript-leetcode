/**
 * Determines if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule.
 *
 * @intuition
 * Three consecutive zeros are needed to plant a flower in the middle position.
 * Positions outside array bounds can be treated as virtual zeros.
 *
 * @approach
 * Iterate through the array checking for three consecutive zeros.
 * Plant a flower when found and skip the next position.
 * Use early termination when enough flowers are planted.
 *
 * @complexity
 * Time complexity: O(n) where n is the length of the flowerbed array
 * Space complexity: O(1) as we modify the input array in-place
 *
 * @param {number[]} flowerbed - Binary array where 0 represents empty plot and 1 represents a plot with a flower
 * @param {number} n - Number of new flowers to plant
 * @return {boolean} - Whether all n flowers can be planted
 */
const canPlaceFlowers = (flowerbed, n) => {
  if (n === 0) return true

  const length = flowerbed.length
  let count = 0

  for (let i = 0; i < length && count < n; i++) {
    const previous = i === 0 ? 0 : flowerbed[i - 1]
    const current = flowerbed[i]
    const next = i === length - 1 ? 0 : flowerbed[i + 1]

    if (previous === 0 && current === 0 && next === 0) {
      count++
      i++ // Skip next position
    }
  }

  return count >= n
}
