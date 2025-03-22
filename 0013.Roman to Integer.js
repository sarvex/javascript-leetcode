/**
 * Direct Comparison Approach
 * 
 * @intuition
 * Roman numerals follow a subtraction rule where if a smaller value comes before a larger value,
 * it represents subtraction. By comparing each value with the next one, we can determine whether
 * to add or subtract the current value without needing to initialize with the last character.
 * 
 * @approach
 * 1. Create a mapping of Roman numerals to their integer values
 * 2. Initialize the result to 0
 * 3. Iterate through each character in the string
 * 4. Compare the current value with the next value
 * 5. If current < next, subtract current from result
 * 6. Otherwise, add current to result
 * 
 * @complexity
 * Time complexity: O(n), where n is the length of the input string
 * Space complexity: O(1), as we use a fixed-size mapping
 * 
 * @param {string} s - Roman numeral string
 * @returns {number} - Integer value
 */
const romanToInt = s => {
    const symbolValues = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };
    
    let result = 0;
    
    for (let i = 0; i < s.length; i++) {
        const current = symbolValues[s[i]];
        const next = symbolValues[s[i + 1]];
        
        if (current < next) {
            result -= current;
        } else {
            result += current;
        }
    }
    
    return result;
};
