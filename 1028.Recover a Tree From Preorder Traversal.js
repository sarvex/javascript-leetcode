/**
 * Stack-based preorder tree recovery
 *
 * @intuition Use a stack to track the path from root to current node, using dash count as depth
 * @approach Parse depth and value in a single pass; pop stack to correct depth, attach as left/right child
 * @complexity Time: O(n) where n = traversal.length
 * @complexity Space: O(h) where h = tree height
 * @param {string} traversal
 * @return {TreeNode}
 */
function recoverFromPreorder(traversal) {
  /**
   * @param {number} val
   * @param {TreeNode|null} left
   * @param {TreeNode|null} right
   */
  function TreeNode(val, left, right) {
    this.val = val ?? 0
    this.left = left ?? null
    this.right = right ?? null
  }
  const stack = []
  let i = 0
  while (i < traversal.length) {
    let depth = 0
    while (traversal[i] === '-') {
      depth++
      i++
    }
    let val = 0
    while (i < traversal.length && traversal[i] !== '-') {
      val = val * 10 + (traversal[i].charCodeAt(0) - 48)
      i++
    }
    const node = new TreeNode(val)
    while (stack.length > depth) stack.pop()
    if (stack.length) {
      if (!stack.at(-1).left) stack.at(-1).left = node
      else stack.at(-1).right = node
    }
    stack.push(node)
  }
  return stack[0]
}
