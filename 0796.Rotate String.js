/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
const rotateString = (s, goal) => s.length === goal.length && (goal + goal).includes(s)
