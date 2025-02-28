/**
 * Determines if all digits in the string will be equal after performing operations
 * 
 * For each operation:
 * 1. We replace each digit with the sum of itself and the next digit modulo 10
 * 2. We perform this operation n-2 times (where n is the length of the string)
 * 3. At the end, we check if the remaining two digits are equal
 * 
 * @param {string} s - A string containing only digits
 * @return {boolean} - True if the final two digits are equal after operations, false otherwise
 */
function hasSameDigits(s) {
    // Convert string to array of numbers
    const t = s.split('').map(Number);
    const n = t.length;
    
    // Perform operations n-2 times
    for (let k = n - 1; k > 1; --k) {
        for (let i = 0; i < k; ++i) {
            t[i] = (t[i] + t[i + 1]) % 10;
        }
    }
    
    // Check if the final two digits are equal
    return t[0] === t[1];
}
