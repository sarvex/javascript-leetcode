/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @param {number[][]} queries
 * @return {boolean[]}
 */
const checkIfPrerequisite = (numCourses, prerequisites, queries) => {
  const processPrerequisites = (inDegree, outgoingEdges, prerequisiteMatrix, course) => {
    for (const nextCourse of outgoingEdges[course]) {
      // Initialize matrix for next course if not already done
      if (prerequisiteMatrix[nextCourse].length === 0) {
        prerequisiteMatrix[nextCourse] = Uint32Array.from(prerequisiteMatrix[course])
      } else {
        // Copy all prerequisites from current course to next course
        prerequisiteMatrix[nextCourse][0] |= prerequisiteMatrix[course][0]
        prerequisiteMatrix[nextCourse][1] |= prerequisiteMatrix[course][1]
        prerequisiteMatrix[nextCourse][2] |= prerequisiteMatrix[course][2]
        prerequisiteMatrix[nextCourse][3] |= prerequisiteMatrix[course][3]
      }

      // Mark current course as a prerequisite for next course
      prerequisiteMatrix[nextCourse][course >> 5] |= 1 << (course & 31)

      // Process next course if all its prerequisites have been processed
      if (--inDegree[nextCourse] === 0) {
        processPrerequisites(inDegree, outgoingEdges, prerequisiteMatrix, nextCourse)
      }
    }
  }

  // Initialize adjacency list for the course graph
  const outgoingEdges = new Array(numCourses)
  for (let i = 0; i < numCourses; ++i) {
    outgoingEdges[i] = []
  }

  // Track in-degree (number of prerequisites) for each course
  const inDegree = new Uint8Array(numCourses)

  // Build the directed graph
  for (const [prerequisite, course] of prerequisites) {
    ++inDegree[course]
    outgoingEdges[prerequisite].push(course)
  }

  // Create bit matrix to efficiently track prerequisite relationships
  // Each course has a fixed-size array where bits represent its prerequisites
  const prerequisiteMatrix = new Array(numCourses).fill(new Uint32Array(0))

  // Process courses with no prerequisites first
  for (let course = 0; course < numCourses; ++course) {
    if (inDegree[course] === 0 && prerequisiteMatrix[course].length === 0) {
      // Initialize with fixed size of 4 (can handle up to 128 courses)
      prerequisiteMatrix[course] = new Uint32Array(4)
      processPrerequisites(inDegree, outgoingEdges, prerequisiteMatrix, course)
    }
  }

  // Answer each query by checking the bit matrix
  const results = new Array(queries.length)
  for (let i = 0; i < queries.length; ++i) {
    const course = queries[i][0]
    const target = queries[i][1]

    // Check if course is a prerequisite for target using bit operations
    // course >> 5 determines which 32-bit chunk to check
    // course & 31 determines which bit position within that chunk
    results[i] = (prerequisiteMatrix[target][course >> 5] & (1 << (course & 31))) !== 0
  }

  return results
}
