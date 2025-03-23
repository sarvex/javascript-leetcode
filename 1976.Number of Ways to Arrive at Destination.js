/**
 * Dijkstra's Algorithm - Find number of ways to reach destination with minimum time
 *
 * @intuition
 * We need to find the number of different ways to reach the destination with the shortest time.
 * This is a shortest path problem with path counting, perfect for Dijkstra's algorithm.
 *
 * @approach
 * 1. Build an adjacency matrix to represent the road network
 * 2. Use Dijkstra's algorithm to find shortest paths
 * 3. For each node, track both the shortest distance and number of ways to reach it
 * 4. When we find a path with equal distance, add to the count of ways
 * 5. Return the count for the destination node
 *
 * @complexity
 * Time: O(n²), where n is the number of nodes (cities)
 * Space: O(n²) for the adjacency matrix
 *
 * @param {number} n - Number of intersections (0 to n-1)
 * @param {number[][]} roads - Array of [from, to, time] representing roads
 * @return {number} Number of ways to reach destination (n-1) with minimum time
 */
const countPaths = (n, roads) => {
  const MOD = 1e9 + 7

  // Build adjacency matrix
  const graph = Array.from({ length: n }, () => Array(n).fill(Infinity))
  for (const [from, to, time] of roads) {
    graph[from][to] = time
    graph[to][from] = time
  }
  graph[0][0] = 0

  // Initialize distance and ways arrays
  const distance = Array(n).fill(Infinity)
  distance[0] = 0

  const ways = Array(n).fill(0)
  ways[0] = 1

  // Track visited nodes
  const visited = Array(n).fill(false)

  // Dijkstra's algorithm
  for (let i = 0; i < n; ++i) {
    // Find unvisited node with minimum distance
    let minNode = -1
    for (let j = 0; j < n; ++j) {
      if (!visited[j] && (minNode === -1 || distance[j] < distance[minNode])) {
        minNode = j
      }
    }

    visited[minNode] = true

    // Update distances and ways for neighbors
    for (let neighbor = 0; neighbor < n; ++neighbor) {
      if (neighbor === minNode) continue

      const newDistance = distance[minNode] + graph[minNode][neighbor]

      if (distance[neighbor] > newDistance) {
        // Found shorter path, update distance and reset ways
        distance[neighbor] = newDistance
        ways[neighbor] = ways[minNode]
      } else if (distance[neighbor] === newDistance) {
        // Found equal path, add to ways
        ways[neighbor] = (ways[neighbor] + ways[minNode]) % MOD
      }
    }
  }

  return ways[n - 1]
}
