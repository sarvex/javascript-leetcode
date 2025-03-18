/**
 * Finds the maximum net income Alice can have by traveling to the optimal leaf node.
 *
 * @param {number[][]} edges - Array of edges where each edge is [a, b] indicating connection between nodes a and b
 * @param {number} bob - The starting node for Bob
 * @param {number[]} amount - Array where amount[i] is the price/reward at node i
 * @returns {number} - The maximum net income Alice can have
 *
 * @intuition
 * This is a tree traversal problem where we need to track both Alice and Bob's paths.
 * Alice starts at node 0 and moves toward leaves, while Bob starts at his node and moves toward node 0.
 * We need to calculate the profit based on who reaches each node first.
 *
 * @approach
 * 1. Build an adjacency list from the edges
 * 2. Find Bob's path to the root (node 0) and record the depth at which he visits each node
 * 3. Perform DFS from node 0 to find Alice's optimal path, calculating profit at each step
 * 4. The profit calculation depends on whether Alice reaches a node before, after, or at the same time as Bob
 *
 * @complexity
 * Time: O(n) where n is the number of nodes in the tree
 * Space: O(n) for the adjacency list and depth tracking arrays
 */
const mostProfitablePath = (edges, bob, amount) => {
  const n = edges.length + 1;

  // Build adjacency list
  const graph = Array.from({ length: n }, () => []);

  edges.forEach(([a, b]) => {
    graph[a].push(b);
    graph[b].push(a);
  });

  // Track Bob's path to root
  const bobDepth = Array(n).fill(-1);

  // Find Bob's path to root using DFS
  const findBobPath = (node, parent, depth) => {
    if (node === 0) {
      bobDepth[node] = depth;
      return true;
    }

    for (const neighbor of graph[node]) {
      if (neighbor === parent) continue;

      if (findBobPath(neighbor, node, depth + 1)) {
        bobDepth[node] = depth;
        return true;
      }
    }

    return false;
  };

  findBobPath(bob, -1, 0);

  // Find Alice's optimal path using DFS
  const findAlicePath = (node, parent, depth) => {
    let income;

    if (bobDepth[node] === depth) {
      income = amount[node] / 2;
    } else if (bobDepth[node] === -1 || bobDepth[node] > depth) {
      income = amount[node];
    } else {
      income = 0;
    }

    const isLeaf = graph[node].length === 1 && node !== 0;

    if (isLeaf) {
      return income;
    }

    let maxChildProfit = -Infinity;

    for (const neighbor of graph[node]) {
      if (neighbor === parent) continue;

      maxChildProfit = Math.max(maxChildProfit, findAlicePath(neighbor, node, depth + 1));
    }

    return income + (maxChildProfit === -Infinity ? 0 : maxChildProfit);
  };

  return findAlicePath(0, -1, 0);
};

