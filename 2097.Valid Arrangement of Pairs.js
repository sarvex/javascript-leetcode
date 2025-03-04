/**
 * @param {number[][]} pairs
 * @return {number[][]}
 */
const validArrangement = (pairs) => {
  // Maps to track in-degrees and out-degrees for each node.
  const inDegree = new Map();
  const outDegree = new Map();

  // Build an adjacency list mapping each node to its neighbors.
    if (!inDegree.has(a)) inDegree.set(a, 0)
    outDegree.set(a, (outDegree.get(a) ?? 0) + 1)
    if (!outDegree.has(b)) outDegree.set(b, 0)
    if (!map.has(a)) map.set(a, [])
    if (!map.has(b)) map.set(b, [])
    map.get(a).push(b)
  }

  let start = map.keys().next().value
  for (let key of map.keys()) {
    const ind = inDegree.get(key)
    const outd = outDegree.get(key)
    if (ind === outd - 1) {
      start = key
      break
    }
  }
  const res = []
  function dfs(node) {
    const nbrs = map.get(node)
    while (nbrs.length) {
      dfs(nbrs.pop())
    }
    res.push(node)
  }
  dfs(start)
  const ans = []
  for (let i = res.length - 1; i > 0; i--) {
    ans.push([res[i], res[i - 1]])
  }
  return ans
}
