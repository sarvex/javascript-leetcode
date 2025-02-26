/**
 * @param {number} start
 * @param {number} finish
 * @param {number} limit
 * @param {string} s
 * @return {number}
 */
const numberOfPowerfulInt = function (start, finish, limit, s) {
  return getPowerfulInt(String(finish), limit, s) - getPowerfulInt(String(start - 1), limit, s)
}

/**
 * @param {string} from
 * @param {number} limit
 * @param {string} suffix
 * @return {number}
 */
function getPowerfulInt(from, limit, suffix) {
  // Fail fast optimizes
  if (from.length < suffix.length) return 0

  if (from.length === suffix.length) return +from >= +suffix ? 1 : 0

  let answer = 0

  // Numbers of digits count (length) difference of from and suffix
  const fsDigitDiff = from.length - suffix.length

  for (let i = 0; i < fsDigitDiff; i++) {
    // If current digit is larger than limit then we can take all remaining combinations with pow(limit+1, digits)
    if (limit < +from[i]) {
      answer += Math.pow(limit + 1, fsDigitDiff - i)
      return answer
    }
    // Else, we process each digit down until we reach 0 digit diff level, then we compare the suffix outside of the loop
    answer += +from[i] * Math.pow(limit + 1, fsDigitDiff - 1 - i)
  }

  // Get last suffix.length digits of from
  // E.g: from: '13579', suffix: '123': compareSuffix = '579'
  const compareSuffix = from.slice(-suffix.length)
  if (compareSuffix >= suffix) ++answer

  return answer
}
