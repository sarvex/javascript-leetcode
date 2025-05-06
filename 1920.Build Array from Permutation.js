/**
 * Build array from permutation via direct mapping
 * @intuition The output array's element at index i is nums[nums[i]]
 * @approach Use Array.map on each element to directly lookup nums[element]
 * @complexity
 * time: O(n)
 * space: O(n)
 * @param {number[]} nums input permutation array
 * @return {number[]} projected array based on permutation
 */
const buildArray = nums => nums.map(v => nums[v])
