/**
 * Greedy Two-Pass Approach with Single Array
 * 
 * @intuition
 * Each child must have at least one candy, and children with higher ratings get more candies
 * than their neighbors. We can solve this with two passes using a single array.
 * 
 * @approach
 * 1. Initialize one array with all 1s (minimum candy each child must have)
 * 2. First pass (left to right): If current rating > previous rating, current candy = previous candy + 1
 * 3. Second pass (right to left): If current rating > next rating and current candy <= next candy,
 *    update current candy to next candy + 1
 * 4. Final result is the sum of all values in the array
 * 
 * @complexity
 * Time complexity: O(n) where n is the length of the ratings array
 * Space complexity: O(n) for the single auxiliary array
 * 
 * @param {number[]} ratings - The ratings array
 * @return {number} - Minimum total number of candies needed
 */
const candy = (ratings) => {
  const n = ratings.length;
  const candies = new Array(n).fill(1);
  
  // Left to right pass
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }
  
  // Right to left pass
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1] && candies[i] <= candies[i + 1]) {
      candies[i] = candies[i + 1] + 1;
    }
  }
  
  // Calculate total
  return candies.reduce((sum, num) => sum + num, 0);
}
