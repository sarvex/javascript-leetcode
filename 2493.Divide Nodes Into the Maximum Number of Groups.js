/**
 * Divides nodes into the maximum number of groups where each group forms a connected component
 * and adjacent nodes must be in different groups
 *
 * @param {number} n - Number of nodes in the graph (1-indexed)
 * @param {number[][]} edges - Array of edges connecting nodes
 * @return {number} - Maximum total number of groups or -1 if impossible
 */
const magnificentSets = (n, edges) => {
  const ERR_CANNOT_GROUP = -1

  const isValidGrouping = (graph, depths, roots, root) => {
    // Skip if already processed
    if (depths[root] !== 0) {
      return true
    }

    let depth = 2 // Start with non-zero values to distinguish from unvisited
    let queue = [root]
    depths[root] = depth
    roots[root] = root

    // BFS to assign alternating depths/groups
    do {
      const nextQueue = []
      for (const element of queue) {
        const currentNode = element

        for (const neighbor of graph[currentNode]) {
          // If neighbor has same depth as current, invalid grouping
          if (depths[neighbor] === depth) {
            return false
          }

          // If unvisited, assign opposite depth and add to queue
          if (depths[neighbor] === 0) {
            depths[neighbor] = depth ^ 1 // Toggle between 2 and 3
            roots[neighbor] = root // Mark as part of this component
            nextQueue.push(neighbor)
          }
        }
      }
      depth ^= 1 // Toggle depth for next level
      queue = nextQueue
    } while (queue.length > 0)

    return true
  }

  const getMaxDepth = (graph, seen, root) => {
    seen[root] = root // Mark as visited with its own index

    let depth = 0
    let queue = [root]

    // BFS to find maximum depth
    do {
      ++depth
      const nextQueue = []

      for (const element of queue) {
        const currentNode = element

        for (const neighbor of graph[currentNode]) {
          // If not yet visited in this traversal
          if (seen[neighbor] !== root) {
            seen[neighbor] = root
            nextQueue.push(neighbor)
          }
        }
      }

      queue = nextQueue
    } while (queue.length > 0)

    return depth
  }
  // Create adjacency list representation of the graph
  const graph = new Array(n)
  for (let i = 0; i < n; ++i) {
    graph[i] = []
  }

  // Populate graph with edges (converting from 1-indexed to 0-indexed)
  for (const [a, b] of edges) {
    graph[a - 1].push(b - 1)
    graph[b - 1].push(a - 1)
  }

  // Initialize tracking arrays
  const seen = new Uint16Array(n) // Used to track visited nodes
  const roots = new Uint16Array(n) // Maps nodes to their component roots
  const maxDepths = new Uint16Array(n) // Maximum depth achievable from each root

  // First pass: Check if all components can be validly grouped (bipartite check)
  for (let i = 0; i < n; ++i) {
    if (!isValidGrouping(graph, seen, roots, i)) {
      return ERR_CANNOT_GROUP
    }
  }

  // Second pass: Calculate maximum depth (number of groups) for each component
  seen.fill(n) // Reset seen array with a value that won't appear naturally
  for (let i = 0; i < n; ++i) {
    maxDepths[roots[i]] = Math.max(maxDepths[roots[i]], getMaxDepth(graph, seen, i))
  }

  // Sum up the maximum depths across all components
  let totalMaxGroups = 0
  for (let i = 0; i < n; ++i) {
    totalMaxGroups += maxDepths[i]
  }

  return totalMaxGroups
}
