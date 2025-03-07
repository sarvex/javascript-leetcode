/**
 * You are given an n x n matrix. You can perform the following operation any number of times:
 * - Choose any two adjacent elements of the matrix and multiply both by -1.
 *
 * @param {number[][]} matrix - The n x n matrix of integers
 * @return {number} - The maximum possible sum after performing operations
 *
 * @complexity Time O(n²), Space O(1)
 */
const maxMatrixSum = (matrix) => {
  const n = matrix.length;
  let negativeCount = 0;
  let absoluteSum = 0;
  let smallestAbsoluteValue = Infinity;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const value = matrix[i][j];
      
      if (value < 0) {
        negativeCount++;
      }
      
      smallestAbsoluteValue = Math.min(smallestAbsoluteValue, Math.abs(value));
      absoluteSum += Math.abs(value);
    }
  }

  if (negativeCount % 2 === 0) {
    return absoluteSum;
  }

  return absoluteSum - 2 * smallestAbsoluteValue;
};

module.exports = maxMatrixSum;
