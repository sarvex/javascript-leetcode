/**
 * Finds the median of two sorted arrays
 * 
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @return {number} - Median value of the combined arrays
 * 
 * @intuition
 * The key insight is to convert this problem into finding the kth smallest element
 * in the merged array. For median, we need the middle element(s).
 * 
 * @approach
 * 1. Define a helper function to find the kth element in the merged array
 * 2. Use binary search approach to eliminate k/2 elements in each iteration
 * 3. Compare elements at potential positions and eliminate the smaller half
 * 4. For even total length, average the two middle elements
 * 5. For odd total length, take the middle element
 * 
 * @complexity
 * Time complexity: O(log(m+n)) where m and n are lengths of the input arrays
 * Space complexity: O(log(m+n)) for recursion stack
 */
const findMedianSortedArrays = (nums1, nums2) => {
  const m = nums1.length;
  const n = nums2.length;
  const totalLength = m + n;
  
  const findKthElement = (i, j, k) => {
    if (i >= m) return nums2[j + k - 1];
    if (j >= n) return nums1[i + k - 1];
    if (k === 1) return Math.min(nums1[i], nums2[j]);
    
    const half = Math.floor(k / 2);
    const midVal1 = i + half - 1 < m ? nums1[i + half - 1] : Infinity;
    const midVal2 = j + half - 1 < n ? nums2[j + half - 1] : Infinity;
    
    return midVal1 < midVal2 
      ? findKthElement(i + half, j, k - half) 
      : findKthElement(i, j + half, k - half);
  };
  
  const leftMiddle = findKthElement(0, 0, Math.floor((totalLength + 1) / 2));
  const rightMiddle = findKthElement(0, 0, Math.floor((totalLength + 2) / 2));
  
  return (leftMiddle + rightMiddle) / 2;
};
