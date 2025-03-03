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
 * @param {TreeNode} root
 * @return {number[]}
 */
const largestValues = (root) => {
  const result = []
  const search = (root, depth) => {
    if (root == null) {
      return
    }
    const { val, left, right } = root
    if (result.length == depth) {
      result.push(val)
    } else {
      result[depth] = Math.max(result[depth], val)
    }
    search(left, depth + 1)
    search(right, depth + 1)
  }
  search(root, 0)
  return result
}
