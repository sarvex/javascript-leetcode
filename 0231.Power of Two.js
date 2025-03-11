/**
 * Determines if a given number is a power of two
 * 
 * @param {number} n - The number to check
 * @return {boolean} - True if n is a power of two, false otherwise
 * 
 * @intuition
 * Powers of two in binary have exactly one bit set to 1 (e.g., 1, 2, 4, 8, 16...
 * are 1, 10, 100, 1000, 10000... in binary). When we subtract 1 from a power of two,
 * all bits to the right of that single 1 become set (e.g., 8-1=7: 1000-1=0111).
 * 
 * @approach
 * Use a bit manipulation trick: for any power of two n, the bitwise AND of n and (n-1)
 * will always be 0. This is because n has only one bit set, and (n-1) has all bits
 * to the right of that bit set, with that bit itself unset.
 * 
 * @complexity
 * Time complexity: O(1) - constant time operation regardless of input size
 * Space complexity: O(1) - uses only a constant amount of space
 */
const isPowerOfTwo = (n) => {
    // A power of two must be positive, and n & (n-1) must be 0
    return n > 0 && (n & (n - 1)) === 0;
};
