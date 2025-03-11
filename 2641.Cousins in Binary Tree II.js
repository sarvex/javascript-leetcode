/**
 * Replace each node's value with the sum of all nodes at the same level minus the sum of the node and its siblings
 *
 * @param {TreeNode} root - The root of the binary tree
 * @return {TreeNode} - The modified binary tree
 *
 * @intuition We need to perform level-order traversal to calculate level sums and track sibling relationships
 *
 * @approach Two-pass BFS:
 *           1. First pass: Calculate level sums and group siblings
 *           2. Second pass: Replace values with level sum minus sibling sum
 *
 * @complexity Time: O(n), where n is the number of nodes in the tree
 * @complexity Space: O(w), where w is the maximum width of the tree
 */
const replaceValueInTree = root => {
  if (!root) return null

  let q = [root]
  root.val = 0

  while (q.length) {
    const size = q.length
    let levelSum = 0
    const siblingGroups = []
    
    // Calculate level sum for next level and group siblings
    for (let i = 0; i < size; i++) {
      const node = q[i]
      const children = []
      let siblingSum = 0
      
      if (node.left) {
        children.push(node.left)
        siblingSum += node.left.val
        levelSum += node.left.val
      }
      
      if (node.right) {
        children.push(node.right)
        siblingSum += node.right.val
        levelSum += node.right.val
      }
      
      if (children.length > 0) {
        siblingGroups.push({ children, siblingSum })
      }
    }
    
    // Update children values
    for (const { children, siblingSum } of siblingGroups) {
      for (const child of children) {
        q.push(child)
        child.val = levelSum - siblingSum
      }
    }
    
    // Remove processed nodes
    q.splice(0, size)
  }
  
  return root
}
