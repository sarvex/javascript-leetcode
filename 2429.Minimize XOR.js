/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
const minimizeXor = (num1, num2) => {
  const bitCount = (i) => {
    i = i - ((i >>> 1) & 0x55555555)
    i = (i & 0x33333333) + ((i >>> 2) & 0x33333333)
    i = (i + (i >>> 4)) & 0x0f0f0f0f
    i = i + (i >>> 8)
    i = i + (i >>> 16)
    return i & 0x3f
  }
  let cnt1 = bitCount(num1)
  let cnt2 = bitCount(num2)
  for (; cnt1 > cnt2; --cnt1) {
    num1 &= num1 - 1
  }
  for (; cnt1 < cnt2; ++cnt1) {
    num1 |= num1 + 1
  }
  return num1
}
