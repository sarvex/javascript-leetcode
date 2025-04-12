/**
 * Digit-by-digit counting with prefix enumeration
 * 
 * @intuition We can count powerful integers by calculating how many valid numbers exist up to a certain bound,
 * then find the difference between the counts for the upper and lower bounds.
 * 
 * @approach We convert numbers to strings and process them digit by digit from most significant to least.
 * For each position, we count valid prefixes based on the digit limit, then handle the suffix comparison separately.
 * 
 * @complexity
 * Time: O(log(finish)), where log represents the number of digits in the numbers
 * Space: O(log(finish)) for string conversions
 * 
 * @param {number} start - The lower bound of the range
 * @param {number} finish - The upper bound of the range
 * @param {number} limit - The maximum allowed digit value
 * @param {string} s - The required suffix for powerful integers
 * @return {number} - Count of powerful integers in the range
 */
const numberOfPowerfulInt = (start, finish, limit, s) => {
  const countUpTo = bound => {
    const boundStr = String(bound);
    
    // Handle cases where bound is shorter than or equal to suffix length
    if (boundStr.length < s.length) return 0;
    if (boundStr.length === s.length) return boundStr >= s ? 1 : 0;
    
    let powerfulCount = 0;
    const prefixLength = boundStr.length - s.length;
    
    // Calculate combinations for each digit position in the prefix
    const calculatePrefixCombinations = () => {
      for (let i = 0; i < prefixLength; i++) {
        const currentDigit = +boundStr[i];
        const remainingPositions = prefixLength - i - 1;
        
        // If digit exceeds limit, count all remaining valid combinations and exit
        if (currentDigit > limit) {
          powerfulCount += Math.pow(limit + 1, remainingPositions + 1);
          return;
        }
        
        // Add combinations for digits less than current bound digit
        powerfulCount += currentDigit * Math.pow(limit + 1, remainingPositions);
      }
      
      // Check if the bound's suffix meets the requirement
      const boundSuffix = boundStr.slice(-s.length);
      if (boundSuffix >= s) powerfulCount++;
    };
    
    calculatePrefixCombinations();
    return powerfulCount;
  };
  
  return countUpTo(finish) - countUpTo(start - 1);
};
