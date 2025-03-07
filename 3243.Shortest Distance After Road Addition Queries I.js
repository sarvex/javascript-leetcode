/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
const shortestDistanceAfterQueries = (n, queries) => {
  // Initialize distances: distance from node i to destination is n - 1 - i
  const distances = Array(n)
    .fill(0)
    .map((_, i) => n - 1 - i)

  // Build the graph with reversed connections for clean propagation of updated distances
  const graph = Array(n)
    .fill(0)
    .map(() => [])
  for (let i = 0; i < n - 1; i++) {
    graph[i + 1].push(i)
  }

  // Recursively update distances starting from a source node using DFS
  const dfs = (current) => {
    const updatedDistance = distances[current] + 1
    for (const neighbor of graph[current]) {
      // If the neighbor already has a shorter or equal distance, skip updating
      if (distances[neighbor] <= updatedDistance) {
        continue
      }
      distances[neighbor] = updatedDistance
      dfs(neighbor)
    }
  }

  const result = []
  // Process each query by adding the new edge and updating distances accordingly
  for (const [source, target] of queries) {
    graph[target].push(source)
    distances[source] = Math.min(distances[source], distances[target] + 1)
    dfs(source)
    result.push(distances[0])
  }

  return result
}
