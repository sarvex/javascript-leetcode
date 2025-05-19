/**
 * Direct triangle inequality check without sorting
 *
 * @intuition
 * For a valid triangle, the sum of the lengths of any two sides must be greater than
 * the length of the remaining side. We can check all three combinations directly.
 * This avoids the need for sorting, making the solution more efficient.
 *
 * @approach
 * 1. First check if all sides are equal for an equilateral triangle
 * 2. Check all three triangle inequality conditions to verify it's a valid triangle
 * 3. If valid, check if any two sides are equal for an isosceles triangle
 * 4. If no sides are equal, it's a scalene triangle
 * 5. If triangle inequality is not satisfied, it's not a valid triangle
 *
 * @complexity
 * Time complexity: O(1) - Constant operations for fixed-size input
 * Space complexity: O(1) - No extra space used beyond input
 *
 * @param {number[]} nums - Array of three positive integers representing side lengths
 * @return {string} - Type of triangle: 'equilateral', 'isosceles', 'scalene', or 'none'
 */
const triangleType = (nums) => {
  const [a, b, c] = nums

  // Check for equilateral triangle first (all sides equal)
  if (a === b && b === c) {
    return 'equilateral'
  }

  // Check all triangle inequality conditions
  if (a + b > c && a + c > b && b + c > a) {
    // Valid triangle - check if any two sides are equal
    if (a === b || a === c || b === c) {
      return 'isosceles'
    } else {
      return 'scalene'
    }
  }

  // Not a valid triangle
  return 'none'
}
