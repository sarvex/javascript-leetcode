/**
 * @param {number[][]} pairs
 * @return {number[][]}
 */
const validArrangement = (pairs) => {
  const graph = new Map()
  const inDegree = new Map()
  const outDegree = new Map()

  // Build graph and degree counts
  for (const [u, v] of pairs) {
    if (!graph.has(u)) graph.set(u, [])
    // Push edge as [u, v]
    graph.get(u).push([u, v])
    outDegree.set(u, (outDegree.get(u) || 0) + 1)
    inDegree.set(v, (inDegree.get(v) || 0) + 1)
  }

  // Sort each vertex's edges for DFS efficiency (optional)
  for (const edges of graph.values()) {
    edges.reverse()
  }

  // Determine starting node
  let start
  for (const [u] of graph) {
    if ((outDegree.get(u) || 0) - (inDegree.get(u) || 0) === 1) {
      start = u
      break
    }
  }
  if (start === undefined) {
    // Use any node with outgoing edge
    start = pairs[0][0]
  }

  const ans = []

  // DFS using Hierholzer's algorithm
  const dfs = (u) => {
    const edges = graph.get(u) || []
    while (edges.length) {
      const edge = edges.pop()
      dfs(edge[1])
      ans.push(edge)
    }
  }

  dfs(start)
  // Reverse the answer (edge order)
  return ans.reverse()
}
