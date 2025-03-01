/**
 * Red-Black Tree Node class
 * Represents a node in a self-balancing binary search tree
 */
class RBTreeNode {
  /**
   * Create a new Red-Black Tree node
   * @param {*} data - The data to store in this node
   */
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
    this.parent = null
    this.color = 0 // 0 = RED, 1 = BLACK
    this.count = 1 // Track duplicate values
  }

  /**
   * Get this node's sibling (the other child of its parent)
   * @returns {RBTreeNode|null} The sibling node or null if no parent
   */
  sibling() {
    if (!this.parent) return null // sibling null if no parent
    return this.isOnLeft() ? this.parent.right : this.parent.left
  }

  /**
   * Check if this node is the left child of its parent
   * @returns {boolean} True if this is a left child
   */
  isOnLeft() {
    return this === this.parent.left
  }

  /**
   * Check if this node has at least one red child
   * @returns {boolean} True if at least one child is red
   */
  hasRedChild() {
    return Boolean(this.left && this.left.color === 0) || Boolean(this.right && this.right.color === 0)
  }
}

/**
 * Red-Black Tree implementation
 * A self-balancing binary search tree with good performance characteristics
 */
class RBTree {
  /**
   * Create a new Red-Black Tree
   * @param {Function} compare - Comparison function for ordering elements
   */
  constructor(compare = (l, r) => (l < r ? -1 : l > r ? 1 : 0)) {
    this.root = null
    this.lt = (l, r) => compare(l, r) < 0
  }

  /**
   * Perform a left rotation on the given node
   * @param {RBTreeNode} pt - The node to rotate around
   */
  rotateLeft(pt) {
    const right = pt.right
    pt.right = right.left

    if (pt.right) pt.right.parent = pt
    right.parent = pt.parent

    if (!pt.parent) this.root = right
    else if (pt === pt.parent.left) pt.parent.left = right
    else pt.parent.right = right

    right.left = pt
    pt.parent = right
  }

  /**
   * Perform a right rotation on the given node
   * @param {RBTreeNode} pt - The node to rotate around
   */
  rotateRight(pt) {
    const left = pt.left
    pt.left = left.right

    if (pt.left) pt.left.parent = pt
    left.parent = pt.parent

    if (!pt.parent) this.root = left
    else if (pt === pt.parent.left) pt.parent.left = left
    else pt.parent.right = left

    left.right = pt
    pt.parent = left
  }

  /**
   * Swap colors between two nodes
   * @param {RBTreeNode} p1 - First node
   * @param {RBTreeNode} p2 - Second node
   */
  swapColor(p1, p2) {
    const tmp = p1.color
    p1.color = p2.color
    p2.color = tmp
  }

  /**
   * Swap data between two nodes
   * @param {RBTreeNode} p1 - First node
   * @param {RBTreeNode} p2 - Second node
   */
  swapData(p1, p2) {
    const tmp = p1.data
    p1.data = p2.data
    p2.data = tmp
  }

  /**
   * Fix Red-Black Tree properties after insertion
   * @param {RBTreeNode} pt - Newly inserted node
   */
  fixAfterInsert(pt) {
    let parent = null
    let grandParent = null

    while (pt !== this.root && pt.color !== 1 && pt.parent?.color === 0) {
      parent = pt.parent
      grandParent = pt.parent.parent

      // Case A: Parent is left child of Grand-parent
      if (parent === grandParent?.left) {
        const uncle = grandParent.right

        // Case 1: Uncle is also red - only recoloring required
        if (uncle && uncle.color === 0) {
          grandParent.color = 0
          parent.color = 1
          uncle.color = 1
          pt = grandParent
        } else {
          // Case 2: pt is right child - Left-rotation required
          if (pt === parent.right) {
            this.rotateLeft(parent)
            pt = parent
            parent = pt.parent
          }

          // Case 3: pt is left child - Right-rotation required
          this.rotateRight(grandParent)
          this.swapColor(parent, grandParent)
          pt = parent
        }
      } else {
        // Case B: Parent is right child of Grand-parent
        const uncle = grandParent.left

        // Case 1: Uncle is also red - only recoloring required
        if (uncle != null && uncle.color === 0) {
          grandParent.color = 0
          parent.color = 1
          uncle.color = 1
          pt = grandParent
        } else {
          // Case 2: pt is left child - Right-rotation required
          if (pt === parent.left) {
            this.rotateRight(parent)
            pt = parent
            parent = pt.parent
          }

          // Case 3: pt is right child - Left-rotation required
          this.rotateLeft(grandParent)
          this.swapColor(parent, grandParent)
          pt = parent
        }
      }
    }
    this.root.color = 1 // Root must be black
  }

  /**
   * Delete a single occurrence of a value
   * @param {*} val - Value to delete
   * @returns {boolean} True if deletion successful
   */
  delete(val) {
    const node = this.find(val)
    if (!node) return false
    node.count--
    if (!node.count) this.deleteNode(node)
    return true
  }

  /**
   * Delete all occurrences of a value
   * @param {*} val - Value to delete
   * @returns {boolean} True if deletion successful
   */
  deleteAll(val) {
    const node = this.find(val)
    if (!node) return false
    this.deleteNode(node)
    return true
  }

  /**
   * Delete a node from the tree
   * @param {RBTreeNode} v - Node to delete
   */
  deleteNode(v) {
    // Find node that replaces a deleted node in BST
    function BSTreplace(x) {
      // When node has 2 children
      if (x.left && x.right) return successor(x.right)
      // When leaf
      if (!x.left && !x.right) return null
      // When single child
      return x.left ?? x.right
    }

    // Find node that doesn't have a left child in the subtree
    function successor(x) {
      let temp = x
      while (temp.left) temp = temp.left
      return temp
    }

    const u = BSTreplace(v)

    // True when u and v are both black
    const uvBlack = (u === null || u.color === 1) && v.color === 1
    const parent = v.parent

    if (!u) {
      // u is null therefore v is leaf
      if (v === this.root) this.root = null
      // v is root, making root null
      else {
        if (uvBlack) {
          // u and v both black
          // v is leaf, fix double black at v
          this.fixDoubleBlack(v)
        } else {
          // u or v is red
          if (v.sibling()) {
            // sibling is not null, make it red
            v.sibling().color = 0
          }
        }
        // Delete v from the tree
        if (v.isOnLeft()) parent.left = null
        else parent.right = null
      }
      return
    }

    if (!v.left || !v.right) {
      // v has 1 child
      if (v === this.root) {
        // v is root, assign the value of u to v, and delete u
        v.data = u.data
        v.left = v.right = null
      } else {
        // Detach v from tree and move u up
        if (v.isOnLeft()) parent.left = u
        else parent.right = u
        u.parent = parent
        if (uvBlack) this.fixDoubleBlack(u)
        // u and v both black, fix double black at u
        else u.color = 1 // u or v red, color u black
      }
      return
    }

    // v has 2 children, swap data with successor and recurse
    this.swapData(u, v)
    this.deleteNode(u)
  }

  /**
   * Fix double black violation at node x
   * @param {RBTreeNode} x - Node with double black violation
   */
  fixDoubleBlack(x) {
    if (x === this.root) return // Reached root

    const sibling = x.sibling()
    const parent = x.parent
    if (!sibling) {
      // No sibling, double black pushed up
      this.fixDoubleBlack(parent)
    } else {
      if (sibling.color === 0) {
        // Sibling red
        parent.color = 0
        sibling.color = 1
        if (sibling.isOnLeft()) this.rotateRight(parent)
        // left case
        else this.rotateLeft(parent) // right case
        this.fixDoubleBlack(x)
      } else {
        // Sibling black
        if (sibling.hasRedChild()) {
          // at least 1 red children
          if (sibling.left && sibling.left.color === 0) {
            if (sibling.isOnLeft()) {
              // left left
              sibling.left.color = sibling.color
              sibling.color = parent.color
              this.rotateRight(parent)
            } else {
              // right left
              sibling.left.color = parent.color
              this.rotateRight(sibling)
              this.rotateLeft(parent)
            }
          } else {
            if (sibling.isOnLeft()) {
              // left right
              sibling.right.color = parent.color
              this.rotateLeft(sibling)
              this.rotateRight(parent)
            } else {
              // right right
              sibling.right.color = sibling.color
              sibling.color = parent.color
              this.rotateLeft(parent)
            }
          }
          parent.color = 1
        } else {
          // 2 black children
          sibling.color = 0
          if (parent.color === 1) this.fixDoubleBlack(parent)
          else parent.color = 1
        }
      }
    }
  }

  /**
   * Insert a new value into the tree
   * @param {*} data - Value to insert
   * @returns {boolean} True if insertion successful
   */
  insert(data) {
    // Search for a position to insert
    let parent = this.root
    while (parent) {
      if (this.lt(data, parent.data)) {
        if (!parent.left) break
        else parent = parent.left
      } else if (this.lt(parent.data, data)) {
        if (!parent.right) break
        else parent = parent.right
      } else break
    }

    // Insert node into parent
    const node = new RBTreeNode(data)
    if (!parent) this.root = node
    else if (this.lt(node.data, parent.data)) parent.left = node
    else if (this.lt(parent.data, node.data)) parent.right = node
    else {
      parent.count++
      return false
    }
    node.parent = parent
    this.fixAfterInsert(node)
    return true
  }

  /**
   * Find a node with the given value
   * @param {*} data - Value to find
   * @returns {RBTreeNode|null} Node containing the value or null
   */
  find(data) {
    let p = this.root
    while (p) {
      if (this.lt(data, p.data)) {
        p = p.left
      } else if (this.lt(p.data, data)) {
        p = p.right
      } else break
    }
    return p ?? null
  }

  /**
   * Generator for in-order traversal
   * @param {RBTreeNode} root - Starting node (defaults to tree root)
   * @yields {*} Values in ascending order
   */
  *inOrder(root = this.root) {
    if (!root) return
    for (const v of this.inOrder(root.left)) yield v
    yield root.data
    for (const v of this.inOrder(root.right)) yield v
  }

  /**
   * Generator for reverse in-order traversal
   * @param {RBTreeNode} root - Starting node (defaults to tree root)
   * @yields {*} Values in descending order
   */
  *reverseInOrder(root = this.root) {
    if (!root) return
    for (const v of this.reverseInOrder(root.right)) yield v
    yield root.data
    for (const v of this.reverseInOrder(root.left)) yield v
  }
}

/**
 * TreeSet implementation backed by Red-Black Tree
 * Provides ordered set operations with good performance
 */
class TreeSet {
  /**
   * Create a new TreeSet
   * @param {Array|Function} collection - Initial values or comparison function
   * @param {Function} compare - Comparison function for ordering elements
   */
  constructor(collection = [], compare = (l, r) => (l < r ? -1 : l > r ? 1 : 0)) {
    if (typeof collection === 'function') {
      compare = collection
      collection = []
    }
    this._size = 0
    this.compare = compare
    this.tree = new RBTree(compare)
    for (const val of collection) this.add(val)
  }

  /**
   * Get the number of elements in the set
   * @returns {number} Set size
   */
  size() {
    return this._size
  }

  /**
   * Check if the set contains a value
   * @param {*} val - Value to check
   * @returns {boolean} True if value exists
   */
  has(val) {
    return !!this.tree.find(val)
  }

  /**
   * Add a value to the set
   * @param {*} val - Value to add
   * @returns {boolean} True if value was added
   */
  add(val) {
    const successful = this.tree.insert(val)
    this._size += successful ? 1 : 0
    return successful
  }

  /**
   * Delete a value from the set
   * @param {*} val - Value to delete
   * @returns {boolean} True if value was deleted
   */
  delete(val) {
    const deleted = this.tree.deleteAll(val)
    this._size -= deleted ? 1 : 0
    return deleted
  }

  /**
   * Find the smallest value greater than or equal to the given value
   * @param {*} val - Reference value
   * @returns {*} Ceiling value or undefined
   */
  ceil(val) {
    let p = this.tree.root
    let higher = null
    while (p) {
      if (this.compare(p.data, val) >= 0) {
        higher = p
        p = p.left
      } else {
        p = p.right
      }
    }
    return higher?.data
  }

  /**
   * Find the largest value less than or equal to the given value
   * @param {*} val - Reference value
   * @returns {*} Floor value or undefined
   */
  floor(val) {
    let p = this.tree.root
    let lower = null
    while (p) {
      if (this.compare(val, p.data) >= 0) {
        lower = p
        p = p.right
      } else {
        p = p.left
      }
    }
    return lower?.data
  }

  /**
   * Find the smallest value strictly greater than the given value
   * @param {*} val - Reference value
   * @returns {*} Higher value or undefined
   */
  higher(val) {
    let p = this.tree.root
    let higher = null
    while (p) {
      if (this.compare(val, p.data) < 0) {
        higher = p
        p = p.left
      } else {
        p = p.right
      }
    }
    return higher?.data
  }

  /**
   * Find the largest value strictly less than the given value
   * @param {*} val - Reference value
   * @returns {*} Lower value or undefined
   */
  lower(val) {
    let p = this.tree.root
    let lower = null
    while (p) {
      if (this.compare(p.data, val) < 0) {
        lower = p
        p = p.right
      } else {
        p = p.left
      }
    }
    return lower?.data
  }

  /**
   * Get the smallest value in the set
   * @returns {*} First value or undefined
   */
  first() {
    return this.tree.inOrder().next().value
  }

  /**
   * Get the largest value in the set
   * @returns {*} Last value or undefined
   */
  last() {
    return this.tree.reverseInOrder().next().value
  }

  /**
   * Remove and return the smallest value
   * @returns {*} First value or undefined
   */
  shift() {
    const first = this.first()
    if (first === undefined) return undefined
    this.delete(first)
    return first
  }

  /**
   * Remove and return the largest value
   * @returns {*} Last value or undefined
   */
  pop() {
    const last = this.last()
    if (last === undefined) return undefined
    this.delete(last)
    return last
  }

  /**
   * Create an iterator for the set
   * @returns {Generator} Generator yielding values in order
   */
  *[Symbol.iterator]() {
    for (const val of this.values()) yield val
  }

  /**
   * Get an iterator for keys (same as values in a set)
   * @returns {Generator} Generator yielding values in order
   */
  *keys() {
    for (const val of this.values()) yield val
  }

  /**
   * Get an iterator for values
   * @returns {Generator} Generator yielding values in order
   */
  *values() {
    for (const val of this.tree.inOrder()) yield val
    return undefined
  }

  /**
   * Get an iterator for values in reverse order
   * @returns {Generator} Generator yielding values in reverse order
   */
  *rvalues() {
    for (const val of this.tree.reverseInOrder()) yield val
    return undefined
  }
}

/**
 * NumberContainers class for managing numbers at specific indices
 * Provides efficient operations for changing and finding numbers
 */
class NumberContainers {
  /**
   * Create a new NumberContainers instance
   */
  constructor() {
    // Map of index -> number
    this.d = new Map()
    // Map of number -> set of indices
    this.g = new Map()
  }

  /**
   * Change the number at a specific index
   * @param {number} index - The index to change
   * @param {number} number - The new number to set
   */
  change(index, number) {
    // If index exists, clean up the old number's record
    if (this.d.has(index)) {
      const oldNumber = this.d.get(index)
      this.g.get(oldNumber).delete(index)
      if (!this.g.get(oldNumber).size()) {
        this.g.delete(oldNumber)
      }
    }

    // Update the index -> number mapping
    this.d.set(index, number)

    // Update the number -> indices mapping
    if (!this.g.has(number)) {
      this.g.set(number, new TreeSet())
    }
    this.g.get(number).add(index)
  }

  /**
   * Find the smallest index containing the given number
   * @param {number} number - Number to find
   * @returns {number} Smallest index with the number, or -1 if not found
   */
  find(number) {
    return this.g.has(number) ? this.g.get(number).first() : -1
  }
}

/**
 * Usage example:
 * var obj = new NumberContainers()
 * obj.change(index, number)
 * var param_2 = obj.find(number)
 */
