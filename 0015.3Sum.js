/**
 * @param {number[]} nums - Array of integers
 * @return {number[][]} - Array of triplets that sum to zero
 * 
 * Solution approach:
 * 1. Sort the array to handle duplicates efficiently
 * 2. Iterate through the array, fixing the first element
 * 3. Use two pointers technique to find pairs that sum to the negative of the first element
 * 4. Skip duplicates to avoid duplicate triplets in the result
 * 
 * Time Complexity: O(n²) where n is the length of the input array
 * Space Complexity: O(1) excluding the output array
 */
const threeSum = (nums) => {
    const n = nums.length;
    const result = [];
    
    // Sort array to handle duplicates and optimize the two-pointer approach
    nums.sort((a, b) => a - b);
    
    // Iterate through possible first elements of triplets
    for (let i = 0; i < n - 2 && nums[i] <= 0; ++i) {
        // Skip duplicates for the first element
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        
        // Two pointers approach to find complementary pairs
        let left = i + 1;
        let right = n - 1;
        
        while (left < right) {
            const currentSum = nums[i] + nums[left] + nums[right];
            
            if (currentSum < 0) {
                // Sum is too small, move left pointer to increase sum
                ++left;
            } else if (currentSum > 0) {
                // Sum is too large, move right pointer to decrease sum
                --right;
            } else {
                // Found a triplet that sums to zero
                result.push([nums[i], nums[left++], nums[right--]]);
                
                // Skip duplicates for second element
                while (left < right && nums[left] === nums[left - 1]) {
                    ++left;
                }
                
                // Skip duplicates for third element
                while (left < right && nums[right] === nums[right + 1]) {
                    --right;
                }
            }
        }
    }
    
    return result;
};
