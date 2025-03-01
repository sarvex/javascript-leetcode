/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * Constructs a binary tree from preorder and postorder traversal arrays
 *
 * In preorder traversal, the root node is visited first, then the left subtree, then the right subtree.
 * In postorder traversal, the left subtree is visited first, then the right subtree, then the root node.
 *
 * This algorithm uses these properties to efficiently reconstruct the tree:
 * 1. The first element in preorder is the root
 * 2. The second element in preorder is the root of the left subtree
 * 3. We find this element in postorder to determine the size of the left subtree
 * 4. We recursively build the left and right subtrees
 *
 * @param {number[]} preorder - Array representing preorder traversal of the tree
 * @param {number[]} postorder - Array representing postorder traversal of the tree
 * @return {TreeNode|null} - Root of the constructed binary tree
 */
const constructFromPrePost = (preorder, postorder) => {
  const n = preorder.length

  // Create a map for O(1) lookup of values in the postorder array
  const postValToIdx = new Map()
  for (let i = 0; i < n; i++) {
    postValToIdx.set(postorder[i], i)
  }

  /**
   * Recursively builds a subtree using the given ranges in preorder and postorder arrays
   *
   * @param {number} preStart - Start index in preorder array (inclusive)
   * @param {number} preEnd - End index in preorder array (inclusive)
   * @param {number} postStart - Start index in postorder array (inclusive)
   * @param {number} postEnd - End index in postorder array (inclusive)
   * @return {TreeNode|null} - Root of the current subtree
   */
  function build(preStart, preEnd, postStart, postEnd) {
    // Base case: invalid range
    if (preStart > preEnd || postStart > postEnd) return null

    // Create the root node from the first element in current preorder segment
    const root = new TreeNode(preorder[preStart])

    // If there's more than one node in this subtree
    if (preStart !== preEnd) {
      // The second element in preorder is the root of the left subtree
      const leftRootVal = preorder[preStart + 1]

      // Find the position of the left subtree's root in postorder
      const leftRootPostIdx = postValToIdx.get(leftRootVal)

      // Calculate the size of the left subtree
      const leftSubtreeSize = leftRootPostIdx - postStart + 1

      // Recursively build left and right subtrees
      // For left subtree:
      //   - In preorder: from just after root to the end of left subtree
      //   - In postorder: from start to the position of left subtree's root
      root.left = build(preStart + 1, preStart + leftSubtreeSize, postStart, leftRootPostIdx)

      // For right subtree:
      //   - In preorder: from after left subtree to the end
      //   - In postorder: from after left subtree to just before the root
      root.right = build(preStart + leftSubtreeSize + 1, preEnd, leftRootPostIdx + 1, postEnd - 1)
    }

    return root
  }

  // Start the recursive tree construction with the full arrays
  return build(0, n - 1, 0, n - 1)
}
