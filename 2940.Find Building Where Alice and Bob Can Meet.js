/**
 * Binary Indexed Tree (Fenwick Tree) implementation for range minimum queries
 * Used to efficiently find the minimum value in a range
 */
class BinaryIndexedTree {
  /**
   * @param {number} size - The size of the tree
   */
  constructor(size) {
    this.INFINITY = 1 << 30;
    this.size = size;
    this.tree = Array(size + 1).fill(this.INFINITY);
  }

  /**
   * Updates the tree at position x with value v
   * @param {number} position - The position to update
   * @param {number} value - The value to set
   */
  update(position, value) {
    while (position <= this.size) {
      this.tree[position] = Math.min(this.tree[position], value);
      position += position & -position; // Move to the next position using bit manipulation
    }
  }

  /**
   * Queries the minimum value up to position x
   * @param {number} position - The position to query up to
   * @return {number} The minimum value, or -1 if no value is found
   */
  query(position) {
    let minValue = this.INFINITY;
    while (position > 0) {
      minValue = Math.min(minValue, this.tree[position]);
      position -= position & -position; // Move to the previous position using bit manipulation
    }
    return minValue === this.INFINITY ? -1 : minValue;
  }
}

/**
 * Finds the leftmost building where Alice and Bob can meet
 * 
 * @param {number[]} heights - Array of building heights
 * @param {number[][]} queries - Array of queries where each query is [alicePosition, bobPosition]
 * @return {number[]} Array of answers for each query, where each answer is the leftmost building
 *                    they can meet or -1 if they cannot meet
 * 
 * Approach:
 * 1. Normalize queries so that the first position is always smaller than the second
 * 2. Process queries in descending order of the second position
 * 3. Use a Binary Indexed Tree to efficiently find meeting points
 * 4. For each query, determine if Alice and Bob can meet directly or need to find another building
 * 
 * Time Complexity: O(n log n + m log m + m log n), where n is the number of buildings and m is the number of queries
 * Space Complexity: O(n + m) for storing the sorted heights and query indices
 */
const leftmostBuildingQueries = (heights, queries) => {
  const buildingCount = heights.length;
  const queryCount = queries.length;
  
  // Normalize queries so that the first position is always smaller than the second
  for (const query of queries) {
    if (query[0] > query[1]) {
      [query[0], query[1]] = [query[1], query[0]];
    }
  }
  
  // Create array of query indices and sort by the second position in descending order
  const queryIndices = Array(queryCount)
    .fill(0)
    .map((_, index) => index);
  queryIndices.sort((i, j) => queries[j][1] - queries[i][1]);
  
  // Initialize Binary Indexed Tree and result array
  const binaryIndexedTree = new BinaryIndexedTree(buildingCount);
  const results = Array(queryCount).fill(-1);
  
  // Sort building heights for binary search
  const sortedHeights = [...heights];
  sortedHeights.sort((a, b) => a - b);
  
  /**
   * Binary search to find the index of a height in the sorted heights array
   * @param {number} height - The height to search for
   * @return {number} The index where the height would be inserted
   */
  const findHeightIndex = (height) => {
    let left = 0;
    let right = buildingCount;
    
    while (left < right) {
      const mid = (left + right) >> 1;
      if (sortedHeights[mid] >= height) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    
    return left;
  };
  
  // Process queries in descending order of the second position
  let currentBuilding = buildingCount - 1;
  for (const queryIndex of queryIndices) {
    const [alicePosition, bobPosition] = queries[queryIndex];
    
    // Update the Binary Indexed Tree with buildings between currentBuilding and bobPosition
    while (currentBuilding > bobPosition) {
      const heightRank = buildingCount - findHeightIndex(heights[currentBuilding]) + 1;
      binaryIndexedTree.update(heightRank, currentBuilding);
      currentBuilding--;
    }
    
    // Determine if Alice and Bob can meet
    if (alicePosition === bobPosition || heights[alicePosition] < heights[bobPosition]) {
      // They can meet at bobPosition directly
      results[queryIndex] = bobPosition;
    } else {
      // They need to find a building taller than alicePosition
      const heightRank = buildingCount - findHeightIndex(heights[alicePosition]);
      results[queryIndex] = binaryIndexedTree.query(heightRank);
    }
  }
  
  return results;
};
