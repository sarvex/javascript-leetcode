/**
 * Calculates the minimum total distance for robots to reach factories for repair
 *
 * @param {number[]} robot - Positions of robots on the X-axis
 * @param {number[][]} factory - Factory positions and repair limits [position, limit]
 * @return {number} - Minimum total distance traveled by all robots
 */
const minimumTotalDistance = (robot, factory) => {
  // Sort positions for optimal assignment strategy
  robot.sort((a, b) => {
    return a - b
  })
  factory.sort((a, b) => {
    return a[0] - b[0]
  })

  const robotCount = robot.length
  const minDistances = Array.from({ length: robotCount + 1 }, () => {
    return Infinity
  })
  minDistances[0] = 0 // Base case: no robots need 0 distance

  // Calculate minimum distances by processing each factory
  factory.forEach(([factoryPosition, repairLimit]) => {
    // Process robots in reverse order to avoid reusing factory slots
    for (let robotsRemaining = robotCount; robotsRemaining > 0; robotsRemaining--) {
      processRobotsForFactory(robotsRemaining, factoryPosition, repairLimit)
    }
  })

  // Helper function to process robots for a specific factory
  const processRobotsForFactory = (robotsRemaining, factoryPosition, repairLimit) => {
    let currentDistance = 0
    const maxRobotsToAssign = Math.min(robotsRemaining, repairLimit)

    // Try assigning different numbers of robots to current factory
    for (let robotsAssigned = 1; robotsAssigned <= maxRobotsToAssign; robotsAssigned++) {
      const robotIndex = robotsRemaining - robotsAssigned
      const robotPosition = robot[robotIndex]

      // Calculate distance for current robot
      currentDistance += Math.abs(robotPosition - factoryPosition)

      // Update minimum distance if possible
      if (minDistances[robotIndex] !== Infinity) {
        minDistances[robotsRemaining] = Math.min(
          minDistances[robotsRemaining],
          minDistances[robotIndex] + currentDistance,
        )
      }
    }
  }

  return minDistances[robotCount]
}
