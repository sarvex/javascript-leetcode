/**
 * @param {number[]} derived
 * @return {boolean}
 */
const doesValidArrayExist = (derived) => {
  let xor = 0
  for (const num of derived) {
    xor ^= num
  }
  return xor == 0
}
