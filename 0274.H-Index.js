/**
 * Counting Sort - Find the largest h-index using counting sort approach
 * @intuition
 * Instead of sorting the entire array, we can use counting sort to track the frequency
 * of each citation count. Since h-index is bounded by the number of papers, we can
 * optimize by capping citation counts at n.
 *
 * @approach
 * 1. Create a frequency array to count papers with each citation count (capped at n)
 * 2. Iterate from the highest possible h-index (n) downward
 * 3. Keep a running sum of papers with at least h citations
 * 4. Return the first h where we have at least h papers with h or more citations
 *
 * @complexity
 * Time: O(n) where n is the number of papers
 * Space: O(n) for the frequency array
 *
 * @param {number[]} citations - Array of citation counts for each paper
 * @return {number} - The h-index value
 */
const hIndex = (citations) => {
  const n = citations.length;
  const counts = new Array(n + 1).fill(0);
  
  // Count papers with each citation count (capped at n)
  for (const citationCount of citations) {
    counts[Math.min(citationCount, n)]++;
  }
  
  // Start from highest possible h-index and work downward
  let papers = 0;
  for (let h = n; h >= 0; h--) {
    papers += counts[h];
    if (papers >= h) {
      return h;
    }
  }
  
  return 0; // Fallback (though the algorithm should always find a valid h-index)
};
