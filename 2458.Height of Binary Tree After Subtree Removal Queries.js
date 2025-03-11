/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root - Binary tree root node
 * @param {number[]} queries - Node values to be removed one at a time
 * @return {number[]} - Heights after each node removal
 *
 * Time Complexity: O(n + q) where n = nodes, q = queries
 * Space Complexity: O(n)
 */
const treeQueries = (root, queries) => {
  const subtreeHeights = new Map();
  const queryResults = new Map();
  
  const calculateSubtreeHeights = (node) => {
    if (node === null) return 0;
    
    if (node.left === null && node.right === null) {
      subtreeHeights.set(node.val, 0);
      return 1;
    }
    
    const leftHeight = calculateSubtreeHeights(node.left);
    const rightHeight = calculateSubtreeHeights(node.right);
    
    subtreeHeights.set(node.val, Math.max(leftHeight, rightHeight));
    return Math.max(leftHeight, rightHeight) + 1;
  };
  
  const processQueries = (node, heights, results, upperPathMax, depth) => {
    if (node === null) return;
    
    if (results.has(node?.left?.val)) {
      const rightPathHeight = (heights.has(node?.right?.val) ? heights.get(node?.right?.val) + 1 : 0) + depth;
      results.set(node.left.val, Math.max(upperPathMax, rightPathHeight));
    }
    
    if (results.has(node?.right?.val)) {
      const leftPathHeight = (heights.has(node?.left?.val) ? heights.get(node?.left?.val) + 1 : 0) + depth;
      results.set(node.right.val, Math.max(upperPathMax, leftPathHeight));
    }
    
    const newUpperMaxForLeft = Math.max(
      upperPathMax,
      (heights.has(node?.right?.val) ? heights.get(node?.right?.val) + 1 : 0) + depth
    );
    
    const newUpperMaxForRight = Math.max(
      upperPathMax,
      (heights.has(node?.left?.val) ? heights.get(node?.left?.val) + 1 : 0) + depth
    );
    
    processQueries(node.left, heights, results, newUpperMaxForLeft, depth + 1);
    processQueries(node.right, heights, results, newUpperMaxForRight, depth + 1);
  };
  
  queries.forEach(queryValue => queryResults.set(queryValue, 0));
  
  calculateSubtreeHeights(root);
  processQueries(root, subtreeHeights, queryResults, 0, 0);
  
  return queries.map(queryValue => queryResults.get(queryValue));
};
