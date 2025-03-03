/**
 * Reverses the values of nodes at odd levels in a binary tree
 *
 * @param {TreeNode} root - The root node of the binary tree
 * @return {TreeNode} - The root node of the modified binary tree
 *
 * Approach: Recursive traversal swapping symmetric node values at odd levels
 * Time Complexity: O(n) where n is the number of nodes in the tree
 * Space Complexity: O(h) where h is the height of the tree (recursion stack)
 */
const reverseOddLevels = (root) => {
  const swapSymmetricNodes = (leftNode, rightNode, level) => {
    if (!leftNode || !rightNode) return

    if (level % 2 === 0) {
      ;[leftNode.val, rightNode.val] = [rightNode.val, leftNode.val]
    }

    swapSymmetricNodes(leftNode.left, rightNode.right, level + 1)
    swapSymmetricNodes(leftNode.right, rightNode.left, level + 1)
  }

  if (!root) return root
  swapSymmetricNodes(root.left, root.right, 0)
  return root
}
