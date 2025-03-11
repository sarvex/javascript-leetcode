/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 * @complexity Time: O(n), where n is the number of nodes in the tree
 * @complexity Space: O(h), where h is the height of the tree
 * @intuition Check if two trees are flip equivalent
 * @approach Recursively check if left and right children are flip equivalent
 */
function flipEquiv(root1, root2) {
    if (root1 === root2) return true;
    if (!root1 || !root2 || root1?.val !== root2?.val) return false;

    const { left: l1, right: r1 } = root1;
    const { left: l2, right: r2 } = root2;

    return (flipEquiv(l1, l2) && flipEquiv(r1, r2)) || (flipEquiv(l1, r2) && flipEquiv(r1, l2));
}
