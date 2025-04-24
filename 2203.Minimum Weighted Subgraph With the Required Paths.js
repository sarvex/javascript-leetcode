/**
 * Tagline: Dijkstra's algorithm from multiple sources and reverse graph for optimal subgraph
 * @intuition Use shortest path algorithms to find the minimum cost to reach dest from both sources, considering all possible meeting points
 * @approach
 * 1. Run Dijkstra from src1, src2, and from dest (on reversed edges) to get shortest paths to all nodes.
 * 2. For every node, sum the cost from src1 to node, src2 to node, and node to dest.
 * 3. The minimum sum over all nodes is the answer. If no such path exists, return -1.
 * @complexity
 * Time: O((n + m) * log n), where n = nodes, m = edges (3 Dijkstra runs)
 * Space: O(n + m)
 *
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} src1
 * @param {number} src2
 * @param {number} dest
 * @return {number}
 */
const minimumWeight = (n, edges, src1, src2, dest) => {
  const buildGraph = (edges, reverse = false) => {
    const g = Array.from({ length: n }, () => [])
    edges.forEach(([u, v, w]) => {
      reverse ? g[v].push([u, w]) : g[u].push([v, w])
    })
    return g
  }

  const dijkstra = (adjacencyList, source) => {
    const shortestDistance = Array(n).fill(Infinity)
    shortestDistance[source] = 0
    const minHeap = [[0, source]]
    const swapHeapNodes = (i, j) => ([minHeap[i], minHeap[j]] = [minHeap[j], minHeap[i]])
    const siftUp = index => {
      while (index > 0) {
        const parent = (index - 1) >> 1
        if (minHeap[parent][0] <= minHeap[index][0]) break
        swapHeapNodes(index, parent)
        index = parent
      }
    }
    const siftDown = index => {
      const heapSize = minHeap.length
      while (true) {
        let smallest = index, left = 2 * index + 1, right = 2 * index + 2
        if (left < heapSize && minHeap[left][0] < minHeap[smallest][0]) smallest = left
        if (right < heapSize && minHeap[right][0] < minHeap[smallest][0]) smallest = right
        if (smallest === index) break
        swapHeapNodes(index, smallest)
        index = smallest
      }
    }
    const pushHeap = node => {
      minHeap.push(node)
      siftUp(minHeap.length - 1)
    }
    const popHeap = () => {
      const top = minHeap[0]
      const last = minHeap.pop()
      if (minHeap.length) {
        minHeap[0] = last
        siftDown(0)
      }
      return top
    }
    while (minHeap.length) {
      const [currentDistance, currentNode] = popHeap()
      if (currentDistance > shortestDistance[currentNode]) continue
      for (const [neighbor, edgeWeight] of adjacencyList[currentNode]) {
        const newDistance = currentDistance + edgeWeight
        if (shortestDistance[neighbor] > newDistance) {
          shortestDistance[neighbor] = newDistance
          pushHeap([newDistance, neighbor])
        }
      }
    }
    return shortestDistance
  }

  const graph = buildGraph(edges)
  const revGraph = buildGraph(edges, true)
  const d1 = dijkstra(graph, src1)
  const d2 = dijkstra(graph, src2)
  const dd = dijkstra(revGraph, dest)

  let min = Infinity
  for (let i = 0; i < n; ++i) {
    if (d1[i] < Infinity && d2[i] < Infinity && dd[i] < Infinity) {
      min = Math.min(min, d1[i] + d2[i] + dd[i])
    }
  }
  return min === Infinity ? -1 : min
}
