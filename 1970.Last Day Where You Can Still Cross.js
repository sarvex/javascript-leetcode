/**
 * Union-Find (Disjoint Set) data structure for efficient
 * tracking of connected components.
 */
class UnionFind {
  /**
   * Creates a new Union-Find data structure with n elements.
   * @param {number} n - Number of elements
   */
  constructor(n) {
    // Initialize parent array where each element points to itself
    this.parent = Array(n)
      .fill(0)
      .map((_, i) => i)
    // Track size of each component for union by size optimization
    this.size = Array(n).fill(1)
  }

  /**
   * Finds the representative element of the set containing x
   * with path compression optimization.
   * @param {number} x - Element to find representative for
   * @return {number} Representative element
   */
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x])
    }
    return this.parent[x]
  }

  /**
   * Merges the sets containing elements a and b.
   * Uses union by size optimization.
   * @param {number} a - First element
   * @param {number} b - Second element
   * @return {boolean} True if sets were merged, false if already in same set
   */
  union(a, b) {
    const [parentA, parentB] = [this.find(a), this.find(b)]

    // Return false if elements are already in the same set
    if (parentA === parentB) {
      return false
    }

    // Union by size: Attach smaller tree to root of larger tree
    if (this.size[parentA] > this.size[parentB]) {
      this.parent[parentB] = parentA
      this.size[parentA] += this.size[parentB]
    } else {
      this.parent[parentA] = parentB
      this.size[parentB] += this.size[parentA]
    }

    return true
  }
}

/**
 * Determines the latest day where you can still cross from top to bottom row.
 * Uses a reverse approach with Union-Find data structure.
 *
 * @param {number} row - Number of rows in the grid
 * @param {number} col - Number of columns in the grid
 * @param {number[][]} cells - Cells that become water in order
 * @return {number} The latest day on which you can walk from top to bottom
 */
const latestDayToCross = (row, col, cells) => {
  const totalCells = cells.length

  // Create Union-Find with 2 extra nodes for virtual source and sink
  const unionFind = new UnionFind(row * col + 2)
  const source = totalCells
  const sink = totalCells + 1

  // Initialize grid with all cells as water (1)
  const grid = Array.from({ length: row }, () => Array(col).fill(1))

  // Direction vectors for 4-directional movement: up, right, down, left
  const directions = [-1, 0, 1, 0, -1]

  // Work backwards from the last day
  for (let day = totalCells - 1; ; --day) {
    // Convert cell coordinates (1-indexed) to 0-indexed
    const [x, y] = [cells[day][0] - 1, cells[day][1] - 1]

    // Change cell from water to land
    grid[x][y] = 0

    // Check all four adjacent cells
    for (let i = 0; i < 4; ++i) {
      const newX = x + directions[i]
      const newY = y + directions[i + 1]

      // Connect to adjacent land cells
      if (newX >= 0 && newX < row && newY >= 0 && newY < col && grid[newX][newY] === 0) {
        unionFind.union(x * col + y, newX * col + newY)
      }
    }

    // Connect top row cells to virtual source
    if (x === 0) {
      unionFind.union(source, y)
    }

    // Connect bottom row cells to virtual sink
    if (x === row - 1) {
      unionFind.union(sink, x * col + y)
    }

    // If source and sink are connected, a path exists
    if (unionFind.find(source) === unionFind.find(sink)) {
      return day
    }
  }
}
