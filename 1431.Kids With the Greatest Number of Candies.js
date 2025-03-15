/**
 * Determines which kids will have the greatest number of candies after receiving extra candies
 *
 * @intuition
 * To find which kids will have the most candies after receiving extra candies, we need to:
 * 1. Find the maximum number of candies any kid currently has
 * 2. For each kid, check if their current candies + extra candies will be >= the maximum
 *
 * @approach
 * 1. Find the maximum number of candies using Math.max(...candies)
 * 2. Map through each kid's candies and return true if their candies + extraCandies >= maximum
 *
 * @complexity
 * Time complexity: O(n) where n is the number of kids
 * Space complexity: O(n) for the result array
 *
 * @param {number[]} candies - Array representing the number of candies each kid has
 * @param {number} extraCandies - Number of extra candies to be given
 * @return {boolean[]} - Array indicating whether each kid will have the greatest number of candies
 */
const kidsWithCandies = (candies, extraCandies) => {
  const maxCandies = Math.max(...candies)
  return candies.map(currentCandies => currentCandies + extraCandies >= maxCandies)
};
