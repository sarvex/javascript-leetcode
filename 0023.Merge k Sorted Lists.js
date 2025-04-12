/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * Divide and Conquer Approach
 * 
 * @intuition Pair-wise merge lists similar to merge sort, reducing the problem size by half in each iteration
 * 
 * @approach Iteratively merge pairs of lists until only one remains, using a helper function to merge two lists
 * 
 * @complexity
 * Time: O(N log k) where N is total nodes and k is number of lists
 * Space: O(1) extra space excluding output list
 * 
 * @param {ListNode[]} lists - Array of linked list heads
 * @return {ListNode} - Head of merged sorted list
 */
const mergeKLists = (lists) => {
  if (!lists?.length) return null;

  const mergeTwoLists = (list1, list2) => {
    const dummyHead = new ListNode();
    let tail = dummyHead;
    
    while (list1 && list2) {
      if (list1.val <= list2.val) {
        tail.next = list1;
        list1 = list1.next;
      } else {
        tail.next = list2;
        list2 = list2.next;
      }
      tail = tail.next;
    }
    
    tail.next = list1 || list2;
    return dummyHead.next;
  };

  while (lists.length > 1) {
    const mergedLists = [];
    
    for (let i = 0; i < lists.length; i += 2) {
      const firstList = lists[i];
      const secondList = i + 1 < lists.length ? lists[i + 1] : null;
      mergedLists.push(mergeTwoLists(firstList, secondList));
    }
    
    lists = mergedLists;
  }

  return lists[0];
};
