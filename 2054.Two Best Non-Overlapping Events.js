/**
 * Computes the maximum sum of values from two non-overlapping events.
 * @param {number[][]} events - Each event is [start, end, value].
 * @return {number}
 */
const maxTwoEvents = (events) => {
  events.sort((a, b) => a[0] - b[0])
  const eventCount = events.length
  const maxValueAfter = Array(eventCount + 1).fill(0)
  for (let i = eventCount - 1; i >= 0; i--) {
    maxValueAfter[i] = Math.max(maxValueAfter[i + 1], events[i][2])
  }
  let maximumTotalValue = 0
  for (const [, currentEventEnd, currentEventValue] of events) {
    let left = 0,
      right = eventCount
    while (left < right) {
      const mid = (left + right) >> 1
      if (events[mid][0] > currentEventEnd) right = mid
      else left = mid + 1
    }
    maximumTotalValue = Math.max(
      maximumTotalValue,
      currentEventValue + (left < eventCount ? maxValueAfter[left] : 0),
    )
  }
  return maximumTotalValue
}
