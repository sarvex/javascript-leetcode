/**
 * @param {string} boxes
 * @return {number[]}
 */
const minOperations = (boxes) => {
  const arr = Array(boxes.length).fill(0)

  let balls = 0,
    moves = 0

  for (let i = 0; i < boxes.length; i++) {
    arr[i] += moves
    if (boxes[i] === '1') balls += 1
    moves += balls
  }

  balls = 0
  moves = 0

  for (let i = boxes.length - 1; i >= 0; i--) {
    arr[i] += moves
    if (boxes[i] === '1') balls += 1
    moves += balls
  }
  return arr
}
