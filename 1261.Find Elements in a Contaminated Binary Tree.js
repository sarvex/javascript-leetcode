/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * FindElements class to recover a contaminated binary tree
 * 
 * A contaminated binary tree has all node values set to -1.
 * This class recovers the tree by setting values according to the formula:
 * - Root value is 0
 * - For node with value x, left child is 2*x+1 and right child is 2*x+2
 * 
 * @class
 */
class FindElements {
    /**
     * Initialize the FindElements object with a contaminated binary tree
     * and recover it while storing all valid values
     * 
     * @param {TreeNode} root - Root of the contaminated binary tree
     */
    constructor(root) {
        this.values = new Set();
        this.recoverTree(root, 0);
    }
    
    /**
     * Recursively recover the tree and store all valid values in a Set
     * 
     * @param {TreeNode|null} node - Current node being processed
     * @param {number} value - Value to assign to the current node
     */
    recoverTree(node, value) {
        if (!node) return;
        
        // Set the node value and add it to our set
        node.val = value;
        this.values.add(value);
        
        // Recursively process left and right children
        this.recoverTree(node.left, 2 * value + 1);
        this.recoverTree(node.right, 2 * value + 2);
    }
    
    /**
     * Check if a target value exists in the recovered tree
     * 
     * @param {number} target - Value to search for
     * @return {boolean} - True if the value exists, false otherwise
     */
    find(target) {
        return this.values.has(target);
    }
}

/**
 * Your FindElements object will be instantiated and called as such:
 * var obj = new FindElements(root)
 * var param_1 = obj.find(target)
 */
