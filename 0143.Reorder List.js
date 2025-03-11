/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * Reorders a linked list in-place to L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...
 * 
 * @param {ListNode} head - Head of the linked list
 * @return {void} Do not return anything, modify head in-place instead
 * 
 * @intuition
 * This problem can be broken down into three steps:
 * 1. Find the middle of the linked list
 * 2. Reverse the second half of the linked list
 * 3. Merge the first half and the reversed second half alternately
 * 
 * @approach
 * 1. Use fast and slow pointers to find the middle of the list
 * 2. Reverse the second half of the list using iterative approach
 * 3. Merge the two halves by alternating nodes
 * 
 * @complexity
 * Time complexity: O(n) where n is the number of nodes in the list
 * Space complexity: O(1) as we only use a constant amount of extra space
 */
const reorderList = (head) => {
    // Edge case: empty list or single node
    if (!head || !head.next) return;
    
    // Step 1: Find the middle of the linked list using fast and slow pointers
    let slowPtr = head;
    let fastPtr = head;
    while (fastPtr.next && fastPtr.next.next) {
        slowPtr = slowPtr.next;
        fastPtr = fastPtr.next.next;
    }
    
    // Split the list into two halves
    let secondHalf = slowPtr.next;
    slowPtr.next = null;
    
    // Step 2: Reverse the second half of the linked list
    let prev = null;
    let current = secondHalf;
    while (current) {
        const nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }
    
    // Step 3: Merge the two halves alternately
    let firstHalf = head;
    secondHalf = prev; // prev now points to the head of reversed second half
    
    while (secondHalf) {
        const firstNext = firstHalf.next;
        const secondNext = secondHalf.next;
        
        // Insert second half node after first half node
        firstHalf.next = secondHalf;
        secondHalf.next = firstNext;
        
        // Move pointers forward
        firstHalf = firstNext;
        secondHalf = secondNext;
    }
};
