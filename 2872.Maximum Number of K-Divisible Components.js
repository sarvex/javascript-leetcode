/**
 * 2872. Maximum Number of K-Divisible Components
 *
 * Problem Description:
 * Given a tree with n nodes labeled from 0 to n - 1, and each node has a value values[i].
 * The tree is represented as an array of edges where edges[i] = [ai, bi] indicates that
 * there is an edge between nodes ai and bi in the tree.
 *
 * A component is a connected sub-tree such that removing any edge from it would disconnect it.
 * We need to find the maximum number of components such that the sum of values in each component is divisible by k.
 *
 * @param {number} n - Number of nodes in the tree
 * @param {number[][]} edges - Array of edges where edges[i] = [ai, bi] represents an edge between nodes ai and bi
 * @param {number[]} values - Array of values where values[i] is the value of node i
 * @param {number} k - The divisor
 * @return {number} - Maximum number of components where the sum of values in each component is divisible by k
 *
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(n) for the adjacency list and recursion stack
 */
const maxKDivisibleComponents = (n, edges, values, k) => {
  // Create adjacency list to represent the tree
  const adjacencyList = Array.from({ length: n }, () => [])

  // Build the adjacency list from edges
  for (const [nodeA, nodeB] of edges) {
    adjacencyList[nodeA].push(nodeB)
    adjacencyList[nodeB].push(nodeA)
  }

  // Counter for k-divisible components
  let componentCount = 0

  /**
   * Depth-first search to find k-divisible components
   * @param {number} currentNode - Current node being processed
   * @param {number} parentNode - Parent of the current node to avoid revisiting
   * @return {number} - Sum of values in the subtree rooted at currentNode
   */
  const dfs = (currentNode, parentNode) => {
    // Initialize sum with the value of current node
    let subtreeSum = values[currentNode]

    // Visit all neighbors except the parent
    for (const neighbor of adjacencyList[currentNode]) {
      if (neighbor !== parentNode) {
        // Add the sum of the subtree rooted at the neighbor
        subtreeSum += dfs(neighbor, currentNode)
      }
    }

    // If the sum is divisible by k, increment the component count
    if (subtreeSum % k === 0) {
      componentCount++
    }

    // Return the sum of this subtree to be used by the parent
    return subtreeSum
  }

  // Start DFS from node 0 (any node can be the root in a tree)
  dfs(0, -1)

  return componentCount
}
