/**
 * Determines the eventual safe nodes in a directed graph.
 * A node is considered safe if all paths from it lead to terminal nodes.
 *
 * @param {number[][]} graph - Adjacency list representing the directed graph
 * @returns {number[]} List of safe node indices
 */
const eventualSafeNodes = (graph) => {
  // Node safety states
  const NODE_STATE = {
    UNKNOWN: 0,
    SAFE: 1,
    UNSAFE: 2,
  }

  const nodeStates = new Uint8Array(graph.length)
  const safeNodes = []

  /**
   * Recursively determines if a node is safe by exploring its paths
   *
   * @param {number} currentNode - Node to check for safety
   * @returns {boolean} Whether the node is safe
   */
  const isSafeNode = (currentNode) => {
    // If node's safety is already determined, return cached result
    if (nodeStates[currentNode] !== NODE_STATE.UNKNOWN) {
      return nodeStates[currentNode] === NODE_STATE.SAFE
    }

    // Mark node as potentially unsafe initially
    nodeStates[currentNode] = NODE_STATE.UNSAFE

    // Check all outgoing edges
    const adjacentNodes = graph[currentNode]
    for (const neighborNode of adjacentNodes) {
      // If any adjacent node is not safe, current node is unsafe
      if (!isSafeNode(neighborNode)) {
        return false
      }
    }

    // All paths lead to safe nodes
    nodeStates[currentNode] = NODE_STATE.SAFE
    return true
  }

  // Evaluate safety for each node
  for (let nodeIndex = 0; nodeIndex < graph.length; nodeIndex++) {
    if (isSafeNode(nodeIndex)) {
      safeNodes.push(nodeIndex)
    }
  }

  return safeNodes
}
