/**
 * Calculates the maximum number of students sitting on a single bench
 *
 * @param {number[][]} students - Array of [studentId, benchId] pairs
 * @return {number} - Maximum number of students on any bench
 */
function maxStudentsOnBench(students) {
  // Create a map to track which students are sitting on each bench
  const benchToStudents = new Map()

  // Populate the map with student IDs for each bench
  for (const [studentId, benchId] of students) {
    if (!benchToStudents.has(benchId)) {
      benchToStudents.set(benchId, new Set())
    }
    benchToStudents.get(benchId).add(studentId)
  }

  // Find the bench with the maximum number of students
  let maxStudents = 0
  for (const studentsOnBench of benchToStudents.values()) {
    maxStudents = Math.max(maxStudents, studentsOnBench.size)
  }

  return maxStudents
}
