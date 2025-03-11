/**
 * Finds the kth bit in the nth binary string
 *
 * @intuition
 * The problem involves generating a sequence of binary strings where each string is derived from the previous one.
 * The pattern follows: S1 = "0", S(i) = S(i-1) + "1" + reverse(invert(S(i-1)))
 * We can solve this using bit manipulation instead of generating the entire string.
 *
 * @approach
 * Instead of generating the entire string, we use bit manipulation to directly compute the kth bit:
 * 1. Identify if k is in the original part, the middle "1", or the inverted part
 * 2. Use properties of k to determine its position and value
 * 3. Apply bitwise operations to calculate the result directly
 *
 * @param {number} n - The index of the binary string (1-indexed)
 * @param {number} k - The position of the bit to find (1-indexed)
 * @return {string} - The character at the kth position ('0' or '1')
 * @complexity Time - O(1), constant time operation using bit manipulation
 * @complexity Space - O(1), constant space used
 */
const findKthBit = (n, k) => String((((k / (k & -k)) >> 1) & 1) ^ (k & 1) ^ 1);
