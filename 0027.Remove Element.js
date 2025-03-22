/**
 * Two-pointer in-place removal
 * 
 * @intuition
 * We can use a two-pointer approach where one pointer (k) keeps track of the position 
 * where the next non-matching element should be placed, while we iterate through the array.
 * 
 * @approach
 * 1. Initialize a pointer k to 0, which represents the position for the next valid element
 * 2. Iterate through each element in the array
 * 3. If the current element is not equal to the value to be removed, place it at position k
 *    and increment k
 * 4. Return k as the new length of the modified array
 * 
 * @complexity
 * Time complexity: O(n) where n is the length of the input array
 * Space complexity: O(1) as we modify the array in-place with no extra space
 * 
 * @param {number[]} nums - The input array
 * @param {number} val - The value to remove
 * @return {number} - The new length of the array after removing all instances of val
 */
const removeElement = (nums, val) => {
    let k = 0;
    for (const x of nums) {
        if (x !== val) {
            nums[k++] = x;
        }
    }
    return k;
};
