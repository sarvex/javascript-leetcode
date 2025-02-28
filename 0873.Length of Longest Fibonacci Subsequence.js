/**
 * @param {number[]} arr
 * @return {number}
 */
const lenLongestFibSubseq = (arr) => {
  const n = arr.length;
  // Use a Map for O(1) lookups of value to index
  const indices = new Map();
  for (let i = 0; i < n; i++) {
    indices.set(arr[i], i);
  }
  
  // Use a Map for the DP table instead of a 2D array to save space
  // Key: `${j},${i}` represents the pair (arr[j], arr[i])
  // Value: length of the Fibonacci subsequence ending with (arr[j], arr[i])
  const dp = new Map();
  
  let maxLen = 0;
  
  // Start from the third possible element in a Fibonacci subsequence
  for (let i = 0; i < n; i++) {
    // Only need to check pairs where j < i
    for (let j = 0; j < i; j++) {
      // For a Fibonacci subsequence, we need to find if arr[i] - arr[j] exists
      const prev = arr[i] - arr[j];
      
      // Skip if prev >= arr[j] as Fibonacci sequence is strictly increasing
      if (prev >= arr[j]) continue;
      
      const k = indices.get(prev);
      
      // Check if the previous element exists and its index is less than j
      if (k !== undefined && k < j) {
        // Get the length of the subsequence ending at (arr[k], arr[j])
        const prevLen = dp.get(`${k},${j}`) || 2;
        dp.set(`${j},${i}`, prevLen + 1);
        maxLen = Math.max(maxLen, prevLen + 1);
      }
    }
  }
  
  return maxLen;
}
