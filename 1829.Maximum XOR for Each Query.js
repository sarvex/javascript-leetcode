/**
 * @param {number[]} nums
 * @param {number} maximumBit
 * @return {number[]}
 */
const getMaximumXor = (nums, maximumBit) => {
  let xor = 0;
  const maxValue = (1 << maximumBit) - 1;
  const result = new Int32Array(nums.length);
  
  for (let i = 0; i < nums.length; i++) {
    xor ^= nums[i];
    result[nums.length - 1 - i] = xor ^ maxValue;
  }
  
  return result;
}
