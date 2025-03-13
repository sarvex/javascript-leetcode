/**
 * Finds the minimum number of queries needed to transform an array into a zero array.
 * 
 * @param {number[]} nums - The input array of integers
 * @param {number[][]} queries - Array of queries, each query is [left, right, value]
 * @return {number} The minimum number of queries needed, or -1 if impossible
 * 
 * @intuition
 * We can use binary search to find the minimum number of queries needed.
 * For each mid value in binary search, we check if it's possible to make
 * all elements in nums <= 0 using the first 'mid' queries.
 * 
 * @approach
 * 1. Use binary search to find the minimum number of queries needed
 * 2. For each mid value, simulate applying the first 'mid' queries using
 *    difference array technique to efficiently handle range updates
 * 3. Check if all elements in nums become <= 0 after applying the queries
 * 4. If possible, search in the left half; otherwise, search in the right half
 * 
 * @complexity
 * Time: O(m * log(m) + n * log(m)) where n is length of nums and m is length of queries
 * Space: O(n) for the difference array
 */
const minZeroArray = (nums, queries) => {
  const [n, m] = [nums.length, queries.length];
  const d = Array.from({ length: n + 1 }, () => { return 0; });
  let [left, right] = [0, m + 1];
  
  const isPossible = (k) => {
    d.fill(0);
    
    // Apply the first k queries using difference array technique
    for (let i = 0; i < k; ++i) {
      const [start, end, val] = queries[i];
      d[start] += val;
      d[end + 1] -= val;
    }
    
    // Check if all elements in nums become <= 0
    for (let i = 0, prefixSum = 0; i < n; ++i) {
      prefixSum += d[i];
      if (nums[i] > prefixSum) {
        return false;
      }
    }
    
    return true;
  };
  
  // Binary search to find the minimum number of queries
  while (left < right) {
    const mid = (left + right) >> 1;
    if (isPossible(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  
  return left > m ? -1 : left;
};
