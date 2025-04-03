/**
 * @tagline BFS with priority queue and query sorting
 * @intuition We need to find how many cells we can visit starting from top-left for each query value.
 * The key insight is to sort queries and process them in ascending order, reusing previous results.
 * @approach
 * 1. Sort queries with their original indices
 * 2. Use a min-heap to process cells in ascending order of their values
 * 3. For each query, process all cells with values less than the query
 * 4. Count unique cells visited and map results back to original query order
 * @complexity
 * Time: O(m*n*log(m*n) + k*log(k)) where m,n are grid dimensions and k is queries length
 * Space: O(m*n + k) for the priority queue and result arrays
 * @param {number[][]} grid
 * @param {number[]} queries
 * @return {number[]}
 */
const maximumPoints = (grid, queries) => {
  const rows = grid.length
  const cols = grid[0].length
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]

  // Sort queries with original indices for processing in ascending order
  const indexedQueries = queries.map((value, index) => [value, index]).sort((a, b) => a[0] - b[0])

  // Min heap implementation using array
  const minHeap = [[grid[0][0], 0, 0]] // [cellValue, row, col]
  grid[0][0] = Infinity // Mark as visited

  const answer = Array(queries.length).fill(0)
  let visitedCellCount = 0

  // Min heap helper functions as local lambdas
  const siftUp = (heap, idx) => {
    const node = heap[idx]

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2)
      if (heap[parentIdx][0] <= node[0]) break

      heap[idx] = heap[parentIdx]
      idx = parentIdx
    }

    heap[idx] = node
  }

  const siftDown = (heap, idx) => {
    const heapSize = heap.length
    const node = heap[idx]
    let childIdx = 2 * idx + 1

    while (childIdx < heapSize) {
      // Choose the smaller child
      if (childIdx + 1 < heapSize && heap[childIdx + 1][0] < heap[childIdx][0]) {
        childIdx++
      }

      if (node[0] <= heap[childIdx][0]) break

      heap[idx] = heap[childIdx]
      idx = childIdx
      childIdx = 2 * idx + 1
    }

    heap[idx] = node
  }

  const addToHeap = (heap, node) => {
    heap.push(node)
    siftUp(heap, heap.length - 1)
  }

  const extractMin = heap => {
    const min = heap[0]
    const last = heap.pop()

    if (heap.length > 0) {
      heap[0] = last
      siftDown(heap, 0)
    }

    return min
  }

  // Process each query in ascending order
  for (const [queryValue, originalIndex] of indexedQueries) {
    // Process all cells with values less than queryValue
    while (minHeap.length && minHeap[0][0] < queryValue) {
      const [cellValue, row, col] = extractMin(minHeap)
      visitedCellCount++

      // Explore adjacent cells
      for (const [rowDelta, colDelta] of directions) {
        const newRow = row + rowDelta
        const newCol = col + colDelta

        const isValidCell =
          newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol] !== Infinity

        if (isValidCell) {
          addToHeap(minHeap, [grid[newRow][newCol], newRow, newCol])
          grid[newRow][newCol] = Infinity // Mark as visited
        }
      }
    }

    answer[originalIndex] = visitedCellCount
  }

  return answer
}
