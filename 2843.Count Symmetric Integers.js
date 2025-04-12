/**
 * Digit Sum Comparison - Count integers with equal digit sums in first and second halves
 *
 * @intuition We need to count numbers with an even number of digits where the sum of the first half
 * equals the sum of the second half. We can iterate through the range and check each number.
 *
 * @approach
 * 1. Iterate through all integers from low to high
 * 2. For each integer, check if it has an even number of digits
 * 3. If it does, split the digits into two halves and compare their sums
 * 4. Count the number of integers where the sums are equal
 *
 * @complexity
 * Time complexity: O(n * log(n)) where n = high - low + 1, as we process each number and each number requires O(log n) operations to check
 * Space complexity: O(log(n)) for storing the digits of each number
 *
 * @param {number} low - The lower bound of the range (inclusive)
 * @param {number} high - The upper bound of the range (inclusive)
 * @return {number} - Count of symmetric integers in the range
 */
const countSymmetricIntegers = (low, high) => {
  let count = 0;
  
  const isSymmetric = x => {
    const digits = x.toString();
    const n = digits.length;
    
    if (n % 2 !== 0) return 0;
    
    const half = n / 2;
    let firstHalfSum = 0;
    let secondHalfSum = 0;
    
    for (let i = 0; i < half; i++) {
      firstHalfSum += Number(digits[i]);
      secondHalfSum += Number(digits[i + half]);
    }
    
    return firstHalfSum === secondHalfSum ? 1 : 0;
  };
  
  for (let x = low; x <= high; x++) {
    count += isSymmetric(x);
  }
  
  return count;
};
