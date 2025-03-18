/**
 * @param {number[][]} edges
 * @param {number[]} nums
 * @return {number[]}
 * 
 * @intuition
 * Find the longest path in a tree where all node values are distinct,
 * except for at most one value that can appear twice.
 *
 * @approach
 * Use a sliding window with a trace array to track value positions.
 *
 * @complexity
 * Time: O(n) where n is the number of nodes
 * Space: O(n + max(nums))
 */
const longestSpecialPath = (edges, nums) => {
  const nodeCount = nums.length;
  
  const adjacencyList = Array.from({ length: nodeCount }, () => []);
  for (const [from, to, length] of edges) {
    adjacencyList[from].push([to, length]);
    adjacencyList[to].push([from, length]);
  }
  
  let maxPathLength = 0;
  let minNodesRequired = 1;
  
  const valuePositions = Array(Math.max(...nums) + 1).fill(-1);
  
  const traverseTree = (currentNode, parentNode, windowStart, currentDepth, pathSum, edgeLengths, duplicatePosition) => {
    const previousPosition = valuePositions[nums[currentNode]];
    valuePositions[nums[currentNode]] = currentDepth;
    
    while (windowStart <= Math.min(previousPosition, duplicatePosition)) {
      pathSum -= edgeLengths[windowStart++];
    }
    
    if (previousPosition !== -1) {
      duplicatePosition = Math.max(duplicatePosition, previousPosition);
    }
    
    if (pathSum > maxPathLength) {
      maxPathLength = pathSum;
      minNodesRequired = currentDepth - windowStart + 1;
    } else if (pathSum === maxPathLength) {
      minNodesRequired = Math.min(minNodesRequired, currentDepth - windowStart + 1);
    }
    
    for (const [nextNode, edgeLength] of adjacencyList[currentNode]) {
      if (nextNode !== parentNode) {
        edgeLengths.push(edgeLength);
        traverseTree(nextNode, currentNode, windowStart, currentDepth + 1, pathSum + edgeLength, edgeLengths, duplicatePosition);
        edgeLengths.pop();
      }
    }
    
    valuePositions[nums[currentNode]] = previousPosition;
  };
  
  traverseTree(0, -1, 0, 0, 0, [], -1);
  
  return [maxPathLength, minNodesRequired];
};
