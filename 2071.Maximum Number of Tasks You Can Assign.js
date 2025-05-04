/**
 * Binary search with greedy assignment strategy
 *
 * @intuition
 * We can use binary search to find the maximum number of tasks that can be assigned.
 * For each potential number of tasks, we need a strategy to determine if it's possible.
 *
 * @approach
 * 1. Sort both tasks and workers in ascending order
 * 2. Binary search on the number of tasks to assign (from 1 to min(tasks.length, workers.length))
 * 3. For each mid value, check if it's possible to assign mid tasks:
 *    - Use a deque to track available workers
 *    - Process tasks from hardest to easiest
 *    - For each task, either assign the strongest capable worker or use a pill with the weakest worker
 * 4. Return the maximum possible number of tasks
 *
 * @complexity
 * Time: O(n log n) where n is max(tasks.length, workers.length)
 * Space: O(m) where m is workers.length
 *
 * @param {number[]} tasks - Array of task difficulties
 * @param {number[]} workers - Array of worker strengths
 * @param {number} pills - Number of strength-boosting pills available
 * @param {number} strength - Amount of strength each pill adds
 * @return {number} Maximum number of tasks that can be assigned
 */
const maxTaskAssign = (tasks, workers, pills, strength) => {
  const n = tasks.length
  const m = workers.length

  // Sort both arrays in ascending order
  tasks.sort((a, b) => a - b)
  workers.sort((a, b) => a - b)

  /**
   * Checks if it's possible to assign 'mid' tasks to workers
   * @param {number} mid - Number of tasks to assign
   * @return {boolean} Whether it's possible to assign 'mid' tasks
   */
  const isPossible = (mid) => {
    let remainingPills = pills
    const availableWorkers = []
    let workerIdx = m - 1

    // Process tasks from hardest to easiest (reverse order)
    for (let i = mid - 1; i >= 0; i--) {
      const currentTask = tasks[i]

      // Add all workers who can handle the current task (with strength boost)
      while (workerIdx >= m - mid && workers[workerIdx] + strength >= currentTask) {
        availableWorkers.unshift(workers[workerIdx])
        workerIdx--
      }

      if (availableWorkers.length === 0) {
        return false
      }

      // If the strongest worker can handle the task without a pill
      if (availableWorkers[availableWorkers.length - 1] >= currentTask) {
        availableWorkers.pop()
      } else {
        // Need to use a pill with the weakest available worker
        if (remainingPills === 0) {
          return false
        }
        remainingPills--
        availableWorkers.shift()
      }
    }

    return true
  }

  // Binary search for the maximum number of tasks
  let left = 1
  let right = Math.min(m, n)
  let result = 0

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (isPossible(mid)) {
      result = mid
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return result
}
