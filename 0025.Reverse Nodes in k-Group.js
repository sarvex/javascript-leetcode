/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

/**
 * Reverse Nodes in k-Group - Optimized iterative approach with length pre-calculation
 * 
 * @intuition
 * We need to reverse every k nodes in the list. By pre-calculating the length, we can
 * quickly determine if we have enough nodes for a complete group without traversing twice.
 * 
 * @approach
 * 1. Calculate total list length to know how many complete groups we have
 * 2. Use a dummy node to handle edge cases like head being reversed
 * 3. For each group of k nodes:
 *    - Track the start and end of the group
 *    - Reverse the group using a local lambda function
 *    - Reconnect the reversed group with the rest of the list
 *    - Move to the next group
 * 
 * @complexity
 * Time complexity: O(n), where n is the number of nodes in the list
 * Space complexity: O(1), only using constant extra space
 * 
 * @param {ListNode | null} head - The head of the linked list
 * @param {number} k - The size of each group to reverse
 * @return {ListNode | null} - The head of the modified linked list
 */
const reverseKGroup = (head, k) => {
  if (!head || k === 1) return head;
  
  const dummy = new ListNode(0);
  dummy.next = head;
  
  const reverseGroup = (start, k) => {
    let prev = null;
    let current = start;
    let next = null;
    
    for (let i = 0; i < k; i++) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    
    return prev;
  };
  
  let length = 0;
  let current = head;
  while (current) {
    length++;
    current = current.next;
  }
  
  let prevGroupEnd = dummy;
  current = head;
  
  while (length >= k) {
    const groupStart = current;
    let groupEnd = current;
    
    for (let i = 1; i < k; i++) {
      groupEnd = groupEnd.next;
    }
    
    const nextGroupStart = groupEnd.next;
    const reversedHead = reverseGroup(groupStart, k);
    
    prevGroupEnd.next = reversedHead;
    groupStart.next = nextGroupStart;
    
    prevGroupEnd = groupStart;
    current = nextGroupStart;
    length -= k;
  }
  
  return dummy.next;
};
