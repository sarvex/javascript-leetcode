/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * Inorder Traversal to Find Minimum Difference
 * 
 * @intuition
 * Since this is a BST, an inorder traversal will visit nodes in ascending order.
 * By tracking the previous value during traversal, we can calculate the difference
 * between consecutive values and find the minimum difference.
 * 
 * @approach
 * 1. Perform an inorder traversal of the BST
 * 2. Track the previous value visited and current minimum difference
 * 3. For each node, calculate the difference with the previous value
 * 4. Update the minimum difference if a smaller one is found
 * 
 * @complexity
 * Time complexity: O(n) where n is the number of nodes in the tree
 * Space complexity: O(h) where h is the height of the tree (recursion stack)
 * 
 * @param {TreeNode} root - Root of the binary search tree
 * @return {number} - Minimum difference between any two nodes
 */
const minDiffInBST = (root) => {
    let [minDiff, prevValue] = [Infinity, -Infinity];
    
    const dfs = (node) => {
        if (!node) return;
        
        dfs(node.left);
        minDiff = Math.min(minDiff, node.val - prevValue);
        prevValue = node.val;
        dfs(node.right);
    };
    
    dfs(root);
    return minDiff;
};
