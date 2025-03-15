/**
 * @param {number[]} nums - Array of houses with different money amounts
 * @param {number} k - Number of houses to rob
 * @return {number} - Minimum capability needed to rob exactly k houses
 * 
 * @intuition
 * We need to find the minimum capability required to rob exactly k houses.
 * This is a perfect candidate for binary search on the answer space.
 * The capability represents the maximum amount we can steal from any house.
 * 
 * @approach
 * 1. Use binary search to find the minimum capability needed
 * 2. For each capability value, check if we can rob at least k houses
 * 3. When checking possibilities, we can't rob adjacent houses
 * 4. The search space is between the minimum and maximum values in nums
 * 
 * @complexity
 * Time: O(n * log(max(nums))) where n is the length of nums
 * Space: O(1) - constant extra space used
 */
const minCapability = (nums, k) => {
  // Helper function to check if we can rob k houses with given capability
  const checkPossibilities = (capability) => {
    let count = 0;
    
    // Use a while loop instead of for loop to have better control over index incrementation
    let i = 0;
    while (i < nums.length) {
      if (nums[i] <= capability) {
        count++;
        // Skip the adjacent house
        i += 2;
      } else {
        // Move to next house
        i += 1;
      }
      
      if (count >= k) {
        return true;
      }
    }
    
    return false;
  };
  
  // Define search space boundaries
  let left = Math.min(...nums);  // Minimum possible capability
  let right = Math.max(...nums); // Maximum possible capability
  
  // Binary search to find the minimum capability
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    
    if (checkPossibilities(mid)) {
      right = mid;  // Try for a lower capability
    } else {
      left = mid + 1;  // Increase the capability
    }
  }
  
  return left;
};
