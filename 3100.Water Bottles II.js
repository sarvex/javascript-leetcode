/**
 * @param {number[]} nums
 * @return {number}
 */
const maxBottlesDrunk = (numBottles, numExchange) => {
  let ans = numBottles
  while (numBottles >= numExchange) {
    numBottles -= numExchange
    ++numExchange
    ++ans
    ++numBottles
  }
  return ans
}
