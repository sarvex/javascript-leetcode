/**
 * @intuition We can use backtracking to generate all possible subsets and count those with maximum bitwise OR value.
 * @approach Calculate the maximum possible bitwise OR value first by OR-ing all elements. Then use backtracking to
 * count subsets. When we find a subset with the maximum OR value, we can optimize by adding 2^(remaining elements)
 * since all combinations of remaining elements with this subset will also have the maximum OR value.
 * @complexity Time: O(2^n) in worst case, but optimized with early termination
 * @complexity Space: O(n) for recursion stack
 * @param {number[]} nums
 * @return {number}
 */
const countMaxOrSubsets = (nums) => {
  const subsets = (index, bitwiseOR) => {
    for (let i = index; i < nums.length; i++) {
      const currBitwiseOR = bitwiseOR | nums[i];
      if (maxBitwiseOR === currBitwiseOR) {
        maxSubsets += 2 ** (nums.length - i - 1);
        continue;
      }
      if (i < nums.length) subsets(i + 1, currBitwiseOR);
    }
  };

  const maxBitwiseOR = nums.reduce((sum, n) => sum | n, 0);
  let maxSubsets = 0;
  subsets(0, 0);

  return maxSubsets;
};
