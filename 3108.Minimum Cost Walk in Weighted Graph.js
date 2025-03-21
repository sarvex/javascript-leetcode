/**
 * Finds the minimum cost to walk between pairs of nodes in a weighted graph
 *
 * @intuition First identify connected components, then compute the bitwise AND of all edge weights in each component
 *
 * @approach Optimize Union-Find by updating costs during merges and finalizing parent pointers at the end
 *
 * @complexity
 * Time: O(E + Q), where E is edges and Q is queries
 * Space: O(N), where N is nodes
 */
const minimumCost = (n, edges, query) => {
  const parent = Array.from({ length: n }, (_, i) => i)
  const costs = Array(n).fill(131071) // 2^17 - 1 (all bits set to 1)
  
  const find = v => {
    if (parent[v] !== v) parent[v] = find(parent[v])
    return parent[v]
  }
  
  for (const [u, v, w] of edges) {
    const p1 = find(u)
    const p2 = find(v)
    parent[p1] = p2
    costs[p1] = costs[p2] = costs[p1] & costs[p2] & w
  }
  
  // Finalize all parent pointers
  for (let i = 0; i < n; i++) {
    parent[i] = find(i)
  }
  
  return query.map(([s, t]) => {
    if (s === t) return 0
    return parent[s] === parent[t] ? costs[parent[s]] : -1
  })
}
