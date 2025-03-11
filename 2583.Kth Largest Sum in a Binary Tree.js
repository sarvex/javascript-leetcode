/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *   this.val = (val===undefined ? 0 : val)
 *   this.left = (left===undefined ? null : left)
 *   this.right = (right===undefined ? null : right)
 * }
 */

/**
 * Returns the kth largest level sum in a binary tree
 * @param {TreeNode} root - The root node of the binary tree
 * @param {number} k - The kth largest level sum to find
 * @return {number} - The kth largest level sum or -1 if not found
 *
 * @intuition
 * Calculate the sum at each level of the tree using DFS, then find the kth largest sum.
 *
 * @approach
 * 1. Use DFS to traverse the tree and accumulate sums at each level
 * 2. Sort the level sums in descending order
 * 3. Return the kth largest sum
 *
 * @complexity
 * Time: O(n + L log L) where n is number of nodes and L is number of levels
 * Space: O(h + L) where h is tree height and L is number of levels
 */
const kthLargestLevelSum = (root, k) => {
  if (!root) return -1;

  const levelSums = [];

  // DFS to calculate level sums
  const dfs = (node, level) => {
    if (!node) return;

    if (levelSums.length <= level) {
      levelSums.push(0);
    }

    levelSums[level] += node.val;

    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  };

  dfs(root, 0);

  if (levelSums.length < k) return -1;

  levelSums.sort((a, b) => b - a);

  return levelSums[k - 1];
};
