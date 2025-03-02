/**
 * @param {number[]} values
 * @return {number}
 */
const maxScoreSightseeingPair = (values) => {
  // Initialize maxScore to 0. This will store the maximum score found during the iterations.
  let result = 0

  // Initialize value as values[0] + 0.
  // value keeps track of the maximum value of (values[i] + i) encountered so far during the iteration.
  // We add +0 because we are considering the first element (values[0]) at index 0.
  // The formula values[i] + i is used for scoring a potential pair, and we start by considering the first element.
  let value = values[0] + 0

  // Start iterating over the array from index 1 (since the first index is already considered in value).
  for (let j = 1; j < values.length; j++) {
    // Calculate the potential score by choosing a pair (i, j) where i < j
    // maxScore is updated to the maximum value between the current maxScore and the score for the current pair (value + values[j] - j).
    // We subtract j from values[j] to account for the fact that j is always greater than i.
    result = Math.max(result, value + values[j] - j)

    // Update value to hold the maximum value of (values[i] + i) encountered so far.
    // We want the largest possible values[i] + i to maximize the score for the next pair.
    // At each step, we check whether adding the current value (values[j]) at index j with the index j itself gives a higher value than value.
    value = Math.max(value, values[j] + j)
  }

  // Return the maximum score found during the iterations.
  return result
}
