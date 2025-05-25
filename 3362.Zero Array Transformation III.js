/**
 * @tagline Greedy approach with priority queue and difference array
 * @intuition
 * We can solve this problem by using a greedy approach with a max priority queue.
 * For each position in the array, we need to ensure we have enough queries to reduce
 * its value to zero. We prioritize queries with later end times to maximize coverage.
 * 
 * @approach
 * 1. Group queries by their start positions
 * 2. Use a max priority queue to store query end positions
 * 3. Process array positions sequentially, adding queries that start at current position
 * 4. Greedily assign queries to satisfy each position's requirement
 * 5. Return the number of queries left unused in the queue
 * 
 * @complexity
 * Time: O(n + q log q) where n is length of nums and q is length of queries
 * Space: O(n + q) for the priority queue and difference array
 * 
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
const maxRemoval = function(nums, queries) {
  const n = nums.length
  
  // Group queries by start position
  const queryGroups = {}
  queries.forEach(query => {
    const start = query[0]
    if (!queryGroups[start]) queryGroups[start] = []
    queryGroups[start].push(query)
  })
  
  // Create a max priority queue for query end positions
  const maxHeap = new MaxPriorityQueue()
  
  // Difference array to track assigned workload
  const diff = new Array(n + 1).fill(0)
  
  let assignedCount = 0 // Number of queries assigned
  
  // Process each position in the array
  for (let i = 0; i < n; i++) {
    // Update current workload from difference array
    if (i > 0) assignedCount += diff[i]
    
    // Add all queries starting at position i to the max heap
    if (queryGroups[i]) {
      queryGroups[i].forEach(query => {
        maxHeap.enqueue(query[1])
      })
    }
    
    // Assign queries to satisfy current position's requirement
    if (!assignQueries(nums[i], i)) {
      return -1 // Impossible to satisfy
    }
  }
  
  // Return number of unused queries
  return maxHeap.size()
  
  // Recursively assign queries until workload meets requirement
  function assignQueries(required, pos) {
    if (assignedCount >= required) return true // Already satisfied
    
    if (maxHeap.isEmpty() || maxHeap.front() < pos) return false // No valid queries
    
    // Use one query
    assignedCount++
    diff[maxHeap.front() + 1]--
    maxHeap.dequeue()
    
    return assignQueries(required, pos)
  }
}

// Implementation of MaxPriorityQueue
class MaxPriorityQueue {
  constructor() {
    this.heap = []
  }
  
  size() {
    return this.heap.length
  }
  
  isEmpty() {
    return this.heap.length === 0
  }
  
  front() {
    return this.heap.length > 0 ? this.heap[0] : -1
  }
  
  enqueue(val) {
    this.heap.push(val)
    this._siftUp(this.heap.length - 1)
  }
  
  dequeue() {
    if (this.heap.length === 0) return -1
    
    const max = this.heap[0]
    const last = this.heap.pop()
    
    if (this.heap.length > 0) {
      this.heap[0] = last
      this._siftDown(0)
    }
    
    return max
  }
  
  _siftUp(idx) {
    const parent = Math.floor((idx - 1) / 2)
    if (idx > 0 && this.heap[parent] < this.heap[idx]) {
      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]]
      this._siftUp(parent)
    }
  }
  
  _siftDown(idx) {
    const left = 2 * idx + 1
    const right = 2 * idx + 2
    let largest = idx
    
    if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
      largest = left
    }
    
    if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
      largest = right
    }
    
    if (largest !== idx) {
      [this.heap[idx], this.heap[largest]] = [this.heap[largest], this.heap[idx]]
      this._siftDown(largest)
    }
  }
}
