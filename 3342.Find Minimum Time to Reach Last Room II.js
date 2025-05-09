/**
 * Use Dijkstra’s algorithm with min-heap and parity waiting
 *
 * @intuition each room opens at moveTime[x][y] and arrival parity must match cell parity, so waiting might be necessary
 * @approach maintain a dist matrix and use Dijkstra's algorithm; for each neighbor compute departure = max(current time, open time), adjust parity if needed, then arrival = departure + 1
 * @complexity
 * time: O(n * m log(n * m))
 * space: O(n * m)
 */
const minTimeToReach = (moveTime) => {
  const n = moveTime.length,
    m = moveTime[0].length
  const inf = Infinity
  const dist = Array.from({ length: n }, () => Array(m).fill(inf))
  dist[0][0] = 0
  const visited = Array.from({ length: n }, () => Array(m).fill(false))
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]
  const heap = []

  const swap = (i, j) => ([heap[i], heap[j]] = [heap[j], heap[i]])
  const push = (node) => {
    heap.push(node)
    let i = heap.length - 1
    while (i > 0) {
      const p = (i - 1) >> 1
      if (heap[p][0] <= heap[i][0]) break
      swap(i, p)
      i = p
    }
  }
  const pop = () => {
    const top = heap[0]
    const last = heap.pop()
    if (heap.length) {
      heap[0] = last
      let i = 0
      while (true) {
        const left = 2 * i + 1,
          right = left + 1
        let smallest = i
        if (left < heap.length && heap[left][0] < heap[smallest][0]) smallest = left
        if (right < heap.length && heap[right][0] < heap[smallest][0]) smallest = right
        if (smallest === i) break
        swap(i, smallest)
        i = smallest
      }
    }
    return top
  }

  push([0, 0, 0])

  while (heap.length) {
    const [time, x, y] = pop()
    if (time > dist[x][y]) continue
    if (visited[x][y]) continue
    visited[x][y] = true
    if (x === n - 1 && y === m - 1) return time
    for (const [dx, dy] of dirs) {
      const nx = x + dx,
        ny = y + dy
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue
      const departure = Math.max(time, moveTime[nx][ny])
      const arrival = departure + ((x + y) % 2) + 1
      if (arrival < dist[nx][ny]) {
        dist[nx][ny] = arrival
        push([arrival, nx, ny])
      }
    }
  }

  return -1
}
