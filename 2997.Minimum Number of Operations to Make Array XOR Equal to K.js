/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minOperations = (nums, k) => {
  // Calculate the XOR of all elements in the array
  let xorResult = 0
  for (const num of nums) {
    xorResult ^= num
  }

  // Calculate the XOR of the current result with the target k
  const target = xorResult ^ k

  // Use Brian Kernighan's algorithm to count set bits
  // This is more efficient than checking each bit
  return countSetBits(target)
}

/**
 * Counts the number of set bits (1s) in a number using Brian Kernighan's algorithm
 * This is faster than checking each bit position
 * @param {number} n
 * @return {number}
 */
const countSetBits = (n) => {
  let count = 0
  
  // Brian Kernighan's algorithm
  // n & (n-1) removes the rightmost set bit
  while (n) {
    n &= (n - 1)
    count++
  }
  
  return count
}
