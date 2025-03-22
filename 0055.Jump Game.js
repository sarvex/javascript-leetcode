/**
 * Greedy Approach - Forward Traversal
 * 
 * @intuition
 * If we can reach position i, we can also reach all positions up to i + nums[i].
 * We track the maximum reachable position and check if we can reach the end.
 * 
 * @approach
 * 1. Initialize maxReach to track the furthest position we can reach
 * 2. Iterate through the array, for each position:
 *    - If current position is beyond our reach, return false
 *    - Update maxReach to max(maxReach, current position + jump length)
 * 3. If we complete the loop, we can reach the end
 * 
 * @complexity
 * Time complexity: O(n) where n is the length of nums
 * Space complexity: O(1) as we only use constant extra space
 * 
 * @param {number[]} nums - Array where each element represents the maximum jump length at that position
 * @return {boolean} - Whether the last index can be reached
 */
const canJump = nums => {
    let maxReach = 0;
    
    for (let i = 0; i < nums.length; ++i) {
        if (maxReach < i) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    
    return true;
};
