/**
 * Check if the final two digits in the string are the same after operations
 * @param {string} s - Input string consisting of digits
 * @return {boolean} - True if final two digits are the same, false otherwise
 */
const hasSameDigits = function(s) {
  // Calculate the number of operations needed to reach 2 digits
  const stringLength = s.length;
  const operationsCount = stringLength - 2;
  
  // Initialize alternating sums for the final two digits
  let firstDigitSum = 0;
  let secondDigitSum = 0;

  // Compute alternating sums using binomial coefficients
  for (let position = 0; position <= operationsCount; position++) {
    // Calculate binomial coefficient modulo 10
    const coefficient = computeBinomialMod10(operationsCount, position);
    
    // Convert character to digit and add to respective sum
    const currentDigit = s.charCodeAt(position) - '0'.charCodeAt(0);
    const nextDigit = s.charCodeAt(position + 1) - '0'.charCodeAt(0);
    
    // Update sums with weighted digits
    firstDigitSum = (firstDigitSum + coefficient * currentDigit) % 10;
    secondDigitSum = (secondDigitSum + coefficient * nextDigit) % 10;
  }

  // Compare the final two digits
  return firstDigitSum === secondDigitSum;
};

/**
 * Compute binomial coefficient (n choose k) modulo 10
 * Uses Chinese Remainder Theorem with mod 2 and mod 5
 * @param {number} n - Upper value in binomial coefficient
 * @param {number} k - Lower value in binomial coefficient
 * @return {number} - Value of binomial coefficient modulo 10
 */
const computeBinomialMod10 = function(n, k) {
  // Calculate binomial coefficient modulo 2 and modulo 5
  const remainderMod2 = computeBinomialMod2(n, k);
  const remainderMod5 = computeBinomialMod5(n, k);

  // Find the number x where x mod 2 = remainderMod2 and x mod 5 = remainderMod5
  for (let x = 0; x < 10; x++) {
    if (x % 2 === remainderMod2 && x % 5 === remainderMod5) {
      return x;
    }
  }
  
  return 0; // Default return if no match found (shouldn't happen)
};

/**
 * Compute binomial coefficient (n choose k) modulo 2
 * Uses bit manipulation for efficiency
 * @param {number} n - Upper value in binomial coefficient
 * @param {number} k - Lower value in binomial coefficient
 * @return {number} - Value of binomial coefficient modulo 2
 */
const computeBinomialMod2 = function(n, k) {
  // Lucas' Theorem: (n choose k) mod 2 = 1 if k is a subset of n in binary
  return ((n & k) === k) ? 1 : 0;
};

/**
 * Compute binomial coefficient (n choose k) modulo 5
 * Uses Lucas' Theorem with a lookup table for small values
 * @param {number} n - Upper value in binomial coefficient
 * @param {number} k - Lower value in binomial coefficient
 * @return {number} - Value of binomial coefficient modulo 5
 */
const computeBinomialMod5 = function(n, k) {
  // Lookup table for small binomial coefficients modulo 5
  const smallBinomialValues = [
    [1],             // C(0,k) mod 5
    [1, 1],          // C(1,k) mod 5
    [1, 2, 1],       // C(2,k) mod 5
    [1, 3, 3, 1],    // C(3,k) mod 5
    [1, 4, 1, 4, 1]  // C(4,k) mod 5
  ];
  
  let result = 1;

  // Apply Lucas' Theorem for modulo 5
  while (n > 0 || k > 0) {
    // Extract the last base-5 digits
    const nMod5 = n % 5;
    const kMod5 = k % 5;

    // If k's digit is larger than n's digit, result is 0
    if (kMod5 > nMod5) return 0;

    // Multiply by the value from the lookup table
    result = (result * smallBinomialValues[nMod5][kMod5]) % 5;
    
    // Move to the next base-5 digits
    n = Math.floor(n / 5);
    k = Math.floor(k / 5);
  }
  
  return result;
};
