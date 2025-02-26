/**
 * @param {number} k
 * @param {number} x
 * @return {number}
 */
const findMaximumNumber = (k, x) => {
  // Binary search to find the maximum number
  let left = 0n;
  let right = 10n ** 15n; // Upper bound based on constraints

  while (left < right) {
    const mid = left + ((right - left + 1n) >> 1n);
    
    // Calculate price sum for numbers 1 to mid
    const priceSum = calculatePrice(mid, x);
    
    if (priceSum <= BigInt(k)) {
      left = mid;
    } else {
      right = mid - 1n;
    }
  }

  return Number(left);
};

/**
 * Calculate the price sum for numbers from 1 to num
 * @param {bigint} num
 * @param {number} x
 * @returns {bigint}
 */
const calculatePrice = (num, x) => {
  let total = 0n;
  
  // Only check positions that are multiples of x
  // We only need to check up to log2(num) positions
  const maxPos = Math.min(60, Math.ceil(Math.log2(Number(num > 2n ** 53n ? 2n ** 53n : num) + 1)));
  
  for (let pos = x; pos <= maxPos; pos += x) {
    // Calculate how many numbers from 1 to num have bit at position pos set
    total += countBitsAtPosition(num, pos);
  }

  return total;
};

/**
 * Count the number of integers from 1 to num that have the bit at position pos set
 * @param {bigint} num - The upper bound
 * @param {number} pos - 1-indexed position
 * @returns {bigint}
 */
const countBitsAtPosition = (num, pos) => {
  // Convert position to 0-indexed for bit operations
  const bitPos = BigInt(pos - 1);
  
  // Each 2^pos numbers form a complete cycle with 2^(pos-1) set bits
  const cycleLength = 1n << bitPos;
  const halfCycle = cycleLength;
  
  // Count complete cycles
  const completeCycles = num >> bitPos;
  let count = (completeCycles >> 1n) * halfCycle;
  
  // Check if we have an odd number of complete cycles
  if (completeCycles & 1n) {
    // Add the remaining numbers in the last incomplete cycle
    const remainder = num & ((1n << bitPos) - 1n);
    count += remainder + 1n;
  }
  
  return count;
}
