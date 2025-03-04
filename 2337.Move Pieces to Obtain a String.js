/**
 * Determines if the start string can be transformed into the target string
 * following specific movement rules.
 *
 * @param {string} start - Initial configuration with 'L', 'R', and '_' placeholders.
 * @param {string} target - Desired configuration.
 * @returns {boolean} - True if the transformation is possible.
 */
const canChange = (start, target) => {
  const length = start.length
  let indexStart = 0
  let indexTarget = 0

  while (true) {
    while (indexStart < length && start[indexStart] === '_') indexStart++
    while (indexTarget < length && target[indexTarget] === '_') indexTarget++

    if (indexStart === length && indexTarget === length) return true
    if (
      indexStart === length ||
      indexTarget === length ||
      start[indexStart] !== target[indexTarget]
    )
      return false

    if (
      (start[indexStart] === 'L' && indexStart < indexTarget) ||
      (start[indexStart] === 'R' && indexStart > indexTarget)
    )
      return false

    indexStart++
    indexTarget++
  }
}
