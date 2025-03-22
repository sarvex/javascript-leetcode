/**
 * Counts the number of complete connected components in an undirected graph.
 *
 *  
 *
 * @intuition
 * A complete component is a connected component where every pair of vertices has an edge.
 * For a component with n vertices to be complete, it must have exactly n*(n-1)/2 edges.
 * We can use DFS to identify all connected components, then check if each one is complete.
 *
 * @approach
 * 1. Build an adjacency list representation of the graph
 * 2. Use DFS to identify all connected components
 * 3. For each component, check if it's complete by verifying:
 *    - Each vertex has exactly (component size - 1) neighbors
 *    - Total edges in component = n*(n-1)/2
 * 4. Count the number of complete components
 *
 * @complexity
 * Time: O(V + E) where V is the number of vertices and E is the number of edges
 * Space: O(V + E) for the adjacency list and visited array
 *
 * @param {number} n - Number of vertices in the graph
 * @param {number[][]} edges - Array of edges where edges[i] = [a, b] represents an edge between a and b
 * @return {number} - Number of complete connected components
 */
const countCompleteComponents = (n, edges) => {
  // Build adjacency list
  const graph = Array(n)
    .fill()
    .map(() => [])

  for (const [a, b] of edges) {
    graph[a].push(b)
    graph[b].push(a)
  }

  // Track visited vertices
  const visited = Array(n).fill(false)

  // Function to perform DFS and collect component vertices
  const dfs = (node, component) => {
    visited[node] = true
    component.push(node)

    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        dfs(neighbor, component)
      }
    }
  }

  // Check if a component is complete
  const isComplete = component => {
    const size = component.length
    const expectedEdges = (size * (size - 1)) / 2

    // Count actual edges in the component
    let actualEdges = 0

    for (const node of component) {
      // Each node in a complete component must have (size-1) neighbors
      if (graph[node].length !== size - 1) {
        return false
      }

      actualEdges += graph[node].length
    }

    // Each edge is counted twice (once from each end)
    return actualEdges / 2 === expectedEdges
  }

  let completeCount = 0

  // Find all connected components
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      const component = []
      dfs(i, component)

      if (isComplete(component)) {
        completeCount++
      }
    }
  }

  return completeCount
}

module.exports = countCompleteComponents
