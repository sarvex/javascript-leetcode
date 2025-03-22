/**
 * Optimized two-pointer approach with early return
 * @intuition We can optimize by handling edge cases early and starting from the third element
 * @approach Check if array length is ≤2 for early return, then iterate from the third element,
 * comparing with element at writeIndex-2 to ensure at most two occurrences of each value
 * @complexity
 * Time complexity: O(n) where n is the length of the input array
 * Space complexity: O(1) as we modify the array in-place
 * @param {number[]} nums - The sorted array with duplicates
 * @return {number} - The length of the modified array
 */
const removeDuplicates = nums => {
    if (nums.length <= 2) return nums.length;
    
    let writeIndex = 2;
    
    for (let readIndex = 2; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== nums[writeIndex - 2]) {
            nums[writeIndex++] = nums[readIndex];
        }
    }
    
    return writeIndex;
};
