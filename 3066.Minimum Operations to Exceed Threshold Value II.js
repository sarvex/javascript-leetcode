/**
 * Calculates the minimum number of operations needed to have at least one element exceeding the threshold.
 * In each operation, the two smallest elements are removed and replaced with (min * 2 + max).
 *
 * @param {number[]} nums - The array of positive integers
 * @param {number} k - The threshold value to exceed
 * @return {number} - The minimum number of operations required
 */
function minOperations(nums, k) {
  const N = nums.length

  // heapify the array in-place
  for (let i = (N - 1) >> 1; i >= 0; --i) {
    sinkDown(nums, i)
  }

  // While the smallest element is less than k
  while (nums.length > 0 && nums[0] < k) {
    // Extract the smallest element
    const x = nums[0]
    nums[0] = nums.pop()

    // If the heap is empty after popping, we're done
    if (nums.length === 0) {
      break
    }

    // Restore heap property
    sinkDown(nums, 0)

    // Extract the next smallest element and combine with the previous one
    const y = nums[0]
    // Replace with the new value: min * 2 + max
    nums[0] = Math.min(x, y) * 2 + Math.max(x, y)
    // Restore heap property
    sinkDown(nums, 0)
  }

  // Return the number of operations performed (original length - current length)
  return N - nums.length
}

/**
 * Restores the heap property by moving the element at the given index down
 * to its correct position in the heap.
 *
 * @param {number[]} array - The heap array
 * @param {number} index - The index of the element to sink down
 */
function sinkDown(array, index) {
  const value = array[index]
  const N = array.length - 1
  const M = (N + 1) >> 1

  while (index < M) {
    let child = (index << 1) + 1
    // Choose the smaller child
    child += +(child < N && array[child] >= array[child + 1])
    // If the value is already smaller than the child, we're done
    if (value <= array[child]) {
      break
    }
    // Move the child up
    array[index] = array[child]
    index = child
  }

  // Place the value in its correct position
  array[index] = value
}
