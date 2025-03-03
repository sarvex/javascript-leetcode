class MaxHeap {
  constructor() {
    this.heap = []
  }

  /**
   * Inserts an item into the heap and maintains the heap property
   * @param {number[]} item - [pass, total, improvement] array
   */
  insert(item) {
    this.heap.push(item)

    let currentIndex = this.heap.length - 1

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2)
      const parent = this.heap[parentIndex]
      const current = this.heap[currentIndex]

      // If parent has greater improvement, heap property is maintained
      if (parent[2] >= current[2])
        break

        // Swap parent and current element
      ;[this.heap[parentIndex], this.heap[currentIndex]] = [current, parent]
      currentIndex = parentIndex
    }
  }

  /**
   * Extracts the item with maximum improvement from the heap
   * @return {number[]|undefined} - [pass, total, improvement] array or undefined if heap is empty
   */
  extract() {
    if (this.heap.length === 0) return undefined

    if (this.heap.length === 1) {
      return this.heap.pop()
    }

    const maxItem = this.heap[0]
    this.heap[0] = this.heap.pop()

    let currentIndex = 0

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1
      const rightChildIndex = leftChildIndex + 1

      const current = this.heap[currentIndex]
      const leftChild = leftChildIndex < this.heap.length ? this.heap[leftChildIndex] : [0, 0, -Infinity]
      const rightChild = rightChildIndex < this.heap.length ? this.heap[rightChildIndex] : [0, 0, -Infinity]

      // Find the element with maximum improvement among current, left child, and right child
      const maxImprovement = Math.max(current[2], leftChild[2], rightChild[2])

      // If current has the maximum improvement, heap property is maintained
      if (maxImprovement === current[2]) break

      // Swap with the child that has maximum improvement
      const swapIndex = maxImprovement === leftChild[2] ? leftChildIndex : rightChildIndex
      ;[this.heap[currentIndex], this.heap[swapIndex]] = [this.heap[swapIndex], current]
      currentIndex = swapIndex
    }

    return maxItem
  }
}

/**
 * There is a school that has classes of students and each class has a pass ratio, which is the ratio of passing students to the total number of students.
 * You are given a 2D integer array classes where classes[i] = [pass, total], where pass is the number of passing students and total is the total number of students in the ith class.
 * You are also given an integer extraStudents which denotes the number of extra students you can add to any class of your choice. These extra students will always pass the class.
 *
 * The task is to maximize the average pass ratio across all classes by strategically allocating the extra students.
 *
 * @param {number[][]} classes - Array of [pass, total] pairs for each class
 * @param {number} extraStudents - Number of extra students to allocate
 * @return {number} - Maximum possible average pass ratio
 *
 * Time Complexity: O(E * log(N)) where N is the number of classes and E is extraStudents
 * Space Complexity: O(N) for the heap
 */
const maxAverageRatio = (classes, extraStudents) => {
  const calculateImprovement = (pass, total) => {
    return (pass + 1) / (total + 1) - pass / total
  }

  // Create a deep copy of classes to avoid modifying the input
  const classesWithIndex = classes.map((c, index) => [...c, index])
  const maxHeap = new MaxHeap()

  // Initialize the heap with all classes and their initial improvements
  for (let i = 0; i < classesWithIndex.length; i++) {
    const [pass, total] = classesWithIndex[i]
    if (pass < total) {
      const improvement = calculateImprovement(pass, total)
      // Store [pass, total, improvement, index]
      maxHeap.insert([pass, total, improvement, i])
    }
  }

  // Allocate each extra student to maximize the overall pass ratio
  let remainingStudents = extraStudents
  while (remainingStudents > 0) {
    const maxImprovementClass = maxHeap.extract()
    if (!maxImprovementClass) break

    // Add one student to the class
    const [pass, total, _, index] = maxImprovementClass
    const newPass = pass + 1
    const newTotal = total + 1

    // Update the class in our copy
    classesWithIndex[index][0] = newPass
    classesWithIndex[index][1] = newTotal

    // Calculate new improvement and reinsert the class
    const newImprovement = calculateImprovement(newPass, newTotal)
    maxHeap.insert([newPass, newTotal, newImprovement, index])

    remainingStudents--
  }

  // Calculate the final average pass ratio using the updated class values
  let totalPassRatio = 0
  for (const [pass, total] of classesWithIndex) {
    totalPassRatio += pass / total
  }

  return totalPassRatio / classes.length
}
