/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

/**
 * Calculates the minimum number of operations needed to sort each level of a binary tree.
 *
 * @param {TreeNode} root - The root node of the binary tree
 * @return {number} - The minimum number of swap operations needed
 *
 * Approach:
 * 1. Perform a level-order traversal of the tree
 * 2. For each level, track both node values and their original positions
 * 3. Sort the values while maintaining their original indices
 * 4. Count the minimum swaps needed to sort the level using a cycle detection algorithm
 * 
 * Time Complexity: O(n log n) where n is the number of nodes in the tree
 * Space Complexity: O(n) for storing the nodes at each level
 */
const minimumOperations = (root) => {
  // Total number of swap operations needed
  let totalSwapOperations = 0;
  
  // Queue for level-order traversal
  let currentLevelNodes = [root];
  
  // Process the tree level by level
  while (currentLevelNodes.length > 0) {
    const levelSize = currentLevelNodes.length;
    
    // Store nodes with their original positions [value, index]
    const nodesWithPositions = new Array(levelSize);
    
    // Collect nodes for the next level
    const nextLevelNodes = [];
    
    // Process current level and prepare for the next level
    for (let i = 0; i < levelSize; i++) {
      const currentNode = currentLevelNodes[i];
      
      // Store node value and its position
      nodesWithPositions[i] = [currentNode.val, i];
      
      // Add children to the next level queue
      if (currentNode.left) nextLevelNodes.push(currentNode.left);
      if (currentNode.right) nextLevelNodes.push(currentNode.right);
    }
    
    // Sort nodes by value while keeping track of original positions
    nodesWithPositions.sort((a, b) => a[0] - b[0]);
    
    // Count minimum swaps using cycle detection
    let currentIndex = 0;
    while (currentIndex < levelSize) {
      // If the element is already in the correct position, move to the next element
      const correctPositionIndex = nodesWithPositions[currentIndex][1];
      if (correctPositionIndex === currentIndex) {
        currentIndex++;
        continue;
      }
      
      // Swap elements to put them in their correct positions
      const elementToSwap = nodesWithPositions[correctPositionIndex];
      const destinationIndex = elementToSwap[1];
      
      // Perform the swap and count it
      nodesWithPositions[correctPositionIndex] = nodesWithPositions[destinationIndex];
      nodesWithPositions[destinationIndex] = elementToSwap;
      totalSwapOperations++;
    }
    
    // Move to the next level
    currentLevelNodes = nextLevelNodes;
  }
  
  return totalSwapOperations;
};
