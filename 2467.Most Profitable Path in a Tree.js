/**
 * Finds the maximum net income Alice can have by traveling to the optimal leaf node.
 *
 * @param {number[][]} edges - Array of edges where each edge is [a, b] indicating connection between nodes a and b
 * @param {number} bob - The starting node for Bob
 * @param {number[]} amount - Array where amount[i] is the price/reward at node i
 * @return {number} - The maximum net income Alice can have
 */
const mostProfitablePath = (edges, bob, amount) => {
  // Build adjacency list with optimized memory usage
  let adjList = new Array(edges.length + 1)
  let r = null

  for (let e of edges) {
    let v1 = e[0],
      v2 = e[1]

    if (adjList[v1] && adjList[v2]) {
      r = e
    }

    if (!adjList[v1]) {
      adjList[v1] = r || e
      adjList[v1].length = 1

      if (r) {
        r = e
      }
      e = null

      adjList[v1][0] = v2
    } else {
      adjList[v1].push(v2)
    }

    if (!adjList[v2]) {
      if (!r && !e) {
        e = []
      }
      adjList[v2] = r || e
      adjList[v2].length = 1

      if (r) {
        r = e
      }

      adjList[v2][0] = v1
    } else {
      adjList[v2].push(v1)
    }
  }

  // Reuse edges array to store Bob's depths (optimization to avoid extra memory allocation)
  let bobDepths = edges.fill(-1)
  bobDepths.push(-1)

  // Find Bob's path to root
  findBobPath(bob, null, 0)

  // Find Alice's best path
  let best = findAlicePath(0, null, 0)

  return best

  /**
   * DFS to find Bob's path from his starting node to node 0
   * @param {number} v1 - Current node
   * @param {number} prev - Previous node (to avoid going back)
   * @param {number} depth - Current depth
   * @return {boolean} - Whether this path leads to node 0
   */
  function findBobPath(v1, prev, depth) {
    bobDepths[v1] = depth

    if (v1 === 0) {
      return true
    }

    for (let v2 of adjList[v1]) {
      if (v2 === prev) {
        continue
      }

      if (findBobPath(v2, v1, depth + 1)) {
        return true
      }
    }

    // This path doesn't lead to root
    bobDepths[v1] = -1
    return false
  }

  /**
   * DFS to find Alice's optimal path from root
   * @param {number} v1 - Current node
   * @param {number} prev - Previous node (to avoid going back)
   * @param {number} depth - Current depth
   * @return {number} - Maximum profit from this node
   */
  function findAlicePath(v1, prev, depth) {
    let profit = -Infinity

    // Try all paths from current node
    for (let v2 of adjList[v1]) {
      if (v2 === prev) {
        continue
      }

      profit = Math.max(profit, findAlicePath(v2, v1, depth + 1))
    }

    // If this is a leaf node, initialize profit to 0
    if (profit === -Infinity) {
      profit = 0
    }

    // Calculate income at current node
    if (bobDepths[v1] === depth) {
      // Alice and Bob reach simultaneously, share the amount
      profit += amount[v1] / 2
    } else if (bobDepths[v1] < 0 || bobDepths[v1] >= depth) {
      // Bob hasn't reached this node yet or won't reach it, Alice gets full amount
      profit += amount[v1]
    }
    // If bobDepths[v1] > 0 && bobDepths[v1] < depth, Bob already opened the gate, so Alice gets nothing

    return profit
  }
}
