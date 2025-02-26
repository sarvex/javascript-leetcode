/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canSortArray = function(nums) {
    // Edge case: array with 0 or 1 element is always sorted
    if (nums.length <= 1) return true;
    
    // More efficient bitcount using Brian Kernighan's algorithm
    const countBits = (num) => {
        let count = 0;
        while (num) {
            num &= (num - 1);
            count++;
        }
        return count;
    };
    
    const n = nums.length;
    
    // Find groups of elements with the same bit count
    let i = 0;
    let prevMax = -1; // Track the maximum value seen in previous groups
    
    while (i < n) {
        const currentBitCount = countBits(nums[i]);
        
        // Find the end of the current group
        let j = i;
        let groupMin = Infinity;
        let groupMax = -Infinity;
        
        // Find the min and max in the current group
        while (j < n && countBits(nums[j]) === currentBitCount) {
            groupMin = Math.min(groupMin, nums[j]);
            groupMax = Math.max(groupMax, nums[j]);
            j++;
        }
        
        // If the minimum of the current group is less than the maximum of any previous group,
        // then we cannot sort the array
        if (groupMin < prevMax) {
            return false;
        }
        
        // Update prevMax for the next group
        prevMax = groupMax;
        
        // Move to the next group
        i = j;
    }
    
    return true;
};