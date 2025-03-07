const xorBeauty = (nums) => {
  return nums.reduce((acc, cur) => acc ^ cur, 0)
}
