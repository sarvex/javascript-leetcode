/**
 * @param {number[][]} grid
 * @return {number}
 */
const minimumObstacles = (grid) => {
  const [m, n] = [grid.length, grid[0].length]
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]
  const ans = Array.from({ length: m }, (v) => new Array(n).fill(Infinity))
  ans[0][0] = 0
  const deque = [[0, 0]]
  while (deque.length) {
    const [x, y] = deque.shift()
    for (const [dx, dy] of dirs) {
      const [i, j] = [x + dx, y + dy]
      if (i < 0 || i > m - 1 || j < 0 || j > n - 1) continue
      const cost = grid[i][j]
      if (ans[x][y] + cost >= ans[i][j]) continue
      ans[i][j] = ans[x][y] + cost
      deque.push([i, j])
    }
  }
  return ans[m - 1][n - 1]
}
