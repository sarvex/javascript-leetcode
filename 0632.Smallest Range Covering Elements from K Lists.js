/**
 * Finds the smallest range that includes at least one number from each of the k lists.
 *
 * @param {number[][]} nums - Array of k sorted integer arrays
 * @return {number[]} - The smallest range [left, right] that includes at least one number from each array
 *
 * @intuition
 * We need to find a range that includes at least one element from each of the k lists.
 * Using a min-heap to efficiently track the smallest element across all lists while maintaining the maximum value.
 *
 * @approach
 * 1. Use MinPriorityQueue to efficiently get the minimum element
 * 2. Initialize the queue with the first element from each list
 * 3. Track the maximum value among all elements in the queue
 * 4. For each iteration, remove the smallest element from the queue
 * 5. Calculate the current range (max - min) and update the answer if smaller
 * 6. Add the next element from the same list to the queue
 * 7. Continue until any list is exhausted
 *
 * @complexity
 * Time: O(n * log(k)) where n is the total number of elements across all lists and k is the number of lists
 * Space: O(k) for the priority queue
 */
const smallestRange = (nums) => {
  const pq = new MinPriorityQueue((x) => x.value)

  let max = -Infinity
  let range = [-Infinity, Infinity]

  // Initialize the priority queue with first element from each list
  for (let i = 0; i < nums.length; i++) {
    const value = nums[i][0]
    pq.enqueue({
      value,
      elementIndex: 0,
      listIndex: i,
    })
    max = Math.max(max, value)
  }

  // Process until any list is exhausted
  while (pq.size() === nums.length) {
    const { value, listIndex: list, elementIndex: element } = pq.dequeue().element

    // Update answer if current range is smaller
    if (max - value < range[1] - range[0]) {
      range = [value, max]
    }

    const next = element + 1
    if (next < nums[list].length) {
      const nextValue = nums[list][next]
      pq.enqueue({
        value: nextValue,
        elementIndex: next,
        listIndex: list,
      })
      max = Math.max(max, nextValue)
    }
  }

  return range
}
