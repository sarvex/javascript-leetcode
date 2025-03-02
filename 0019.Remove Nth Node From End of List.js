/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head - Head of the linked list
 * @param {number} n - Position from the end to remove (1-indexed)
 * @return {ListNode} - Head of the modified linked list
 * 
 * Solution approach:
 * 1. Use a dummy node to handle edge cases (like removing the head)
 * 2. Implement the two-pointer technique:
 *    - Move the fast pointer n steps ahead
 *    - Move both pointers until fast reaches the end
 *    - The slow pointer will be at the node before the one to be removed
 * 3. Remove the target node by adjusting pointers
 * 
 * Time Complexity: O(L) where L is the length of the linked list
 * Space Complexity: O(1) - only using a constant amount of extra space
 */
const removeNthFromEnd = (head, n) => {
    // Create a dummy node to handle edge cases (like removing the head)
    const dummy = new ListNode(0, head);
    
    // Initialize two pointers
    let fastPointer = dummy;
    let slowPointer = dummy;
    
    // Move fast pointer n steps ahead
    for (let i = 0; i < n; i++) {
        fastPointer = fastPointer.next;
    }
    
    // Move both pointers until fast pointer reaches the end
    // This positions slow pointer at the node just before the one to be removed
    while (fastPointer.next) {
        slowPointer = slowPointer.next;
        fastPointer = fastPointer.next;
    }
    
    // Remove the target node by skipping it in the list
    slowPointer.next = slowPointer.next.next;
    
    // Return the head of the modified list (dummy.next handles the case where head was removed)
    return dummy.next;
};
