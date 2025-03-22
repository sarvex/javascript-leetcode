/**
 * Merge two sorted arrays in-place
 * @intuition Start from the end of both arrays and place the larger element at the end of nums1
 * @approach Use a three-pointer technique working backwards from the end of both arrays
 * @complexity
 * - Time complexity: O(m+n), where m and n are the lengths of nums1 and nums2
 * - Space complexity: O(1), constant extra space used
 * @param {number[]} nums1 - First array with extra space at the end
 * @param {number} m - Number of elements in nums1
 * @param {number[]} nums2 - Second array to be merged
 * @param {number} n - Number of elements in nums2
 * @return {void} Do not return anything, modify nums1 in-place instead
 */
const merge = (nums1, m, nums2, n) => {
  for (let i = m - 1, j = n - 1, k = m + n - 1; j >= 0; --k) {
    nums1[k] = i >= 0 && nums1[i] > nums2[j] ? nums1[i--] : nums2[j--];
  }
};
