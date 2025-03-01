/**
 * @param {number[][]} edges - List of undirected edges where each edge is an array [u, v] of two vertices
 * @return {number[]} - The last edge that results in a cycle
 *
 * Problem: In this problem, we have an undirected graph that started as a tree with n nodes labeled from 1 to n.
 * With the addition of exactly one edge, the graph became cyclic. We need to find the last edge in the input that
 * can be removed to make the graph acyclic again.
 *
 * Approach: Use Union-Find (Disjoint Set) data structure to detect cycles in the graph.
 * Time Complexity: O(n), where n is the number of edges
 * Space Complexity: O(n), for the parent array
 */
const findRedundantConnection = (edges) => {
  if (!edges || edges.length === 0) {
    return []
  }

  const nodeCount = edges.length
  const disjointSet = new DisjointSet(nodeCount + 1) // +1 because nodes are 1-indexed

  for (const [sourceNode, targetNode] of edges) {
    // If we can't union the nodes, it means they already belong to the same set
    // which indicates adding this edge creates a cycle
    if (!disjointSet.union(sourceNode, targetNode)) {
      return [sourceNode, targetNode]
    }
  }

  return [] // This should not happen given the problem constraints
}

/**
 * DisjointSet (Union-Find) data structure implementation with path compression
 */
class DisjointSet {
  /**
   * Initialize the disjoint set with n elements
   * @param {number} size - Number of elements in the set
   */
  constructor(size) {
    // Initialize each element as its own parent
    this.parents = Array.from({ length: size }, (_, index) => index)
  }

  /**
   * Find the representative (root) of the set containing element x
   * Uses path compression for optimization
   * @param {number} x - The element to find the representative for
   * @return {number} - The representative of the set
   */
  find(x) {
    if (this.parents[x] !== x) {
      // Path compression: Make every examined node point directly to the root
      this.parents[x] = this.find(this.parents[x])
    }
    return this.parents[x]
  }

  /**
   * Union two sets containing elements x and y
   * @param {number} x - First element
   * @param {number} y - Second element
   * @return {boolean} - True if the elements were in different sets and were united,
   *                     False if they were already in the same set
   */
  union(x, y) {
    const rootX = this.find(x)
    const rootY = this.find(y)

    // If x and y are already in the same set, adding an edge between them creates a cycle
    if (rootX === rootY) {
      return false
    }

    // Union by making rootY the parent of rootX
    this.parents[rootX] = rootY
    return true
  }
}
