/**
 * Counts beautiful numbers in range [l, r]
 *
 * @intuition
 * A beautiful number is one where the product of its digits is divisible by the sum of its digits.
 * For large ranges, checking each number individually would be inefficient. Instead, we use
 * a digit-by-digit approach with dynamic programming to count beautiful numbers up to a certain value.
 *
 * @approach
 * Use digit-by-digit dynamic programming with memoization to count beautiful numbers up to a given bound.
 * Calculate counts for r and l-1 separately, then return their difference.
 *
 * @complexity
 * Time: O(log(r) * 10 * log(r) * log(r))
 * Space: O(log(r) * log(r) * log(r))
 *
 * @param {number} l - Lower bound of the range
 * @param {number} r - Upper bound of the range
 * @return {number} - Count of beautiful numbers in the range [l, r]
 */
const beautifulNumbers = (l, r) => {
  const solve = (num) => {
    const str = String(num);
    const memo = new Map();
    
    const dp = (pos, tight, prod, sum) => {
      if (pos >= str.length) {
        return sum !== 0 && prod % sum === 0 ? 1 : 0;
      }
      
      const key = `${pos},${prod},${sum},${tight}`;
      if (memo.has(key)) return memo.get(key);
      
      const limit = tight ? parseInt(str[pos]) : 9;
      let count = 0;
      
      for (let digit = 0; digit <= limit; digit++) {
        const newTight = tight && digit === limit;
        
        if (sum === 0 && digit === 0) {
          count += dp(pos + 1, newTight, prod, sum);
        } else {
          count += dp(pos + 1, newTight, prod * digit, sum + digit);
        }
      }
      
      memo.set(key, count);
      return count;
    };
    
    return dp(0, true, 1, 0);
  };
  
  const rightCount = solve(r);
  const leftCount = solve(l - 1);
  
  return rightCount - leftCount;
};
