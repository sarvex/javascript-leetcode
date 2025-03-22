/**
 * Greedy Approach with Optimal Jump Selection
 * 
 * @intuition
 * We can solve this by tracking the furthest position we can reach at each step.
 * When we reach the boundary of our current jump, we make a new jump and update
 * the boundary to the furthest position we've seen so far.
 * 
 * @approach
 * 1. Track three variables: jumps (answer), furthestReach (max distance possible), 
 *    and currentJumpEnd (boundary of current jump)
 * 2. Iterate through the array (except the last element since we don't need to jump from it)
 * 3. For each position, update the furthest position we can reach
 * 4. When we reach the boundary of our current jump, increment jumps and extend
 *    the boundary to the furthest position we've seen
 * 
 * @complexity
 * Time complexity: O(n) where n is the length of nums
 * Space complexity: O(1) as we only use constant extra space
 * 
 * @param {number[]} nums - Array of non-negative integers representing max jump length
 * @return {number} - Minimum number of jumps to reach the last index
 */
const jump = (nums) => {
  let jumps = 0;
  let furthestReach = 0;
  let currentJumpEnd = 0;
  
  // No need to check the last element as we don't need to jump from it
  for (let i = 0; i < nums.length - 1; i++) {
    // Update the furthest position we can reach
    furthestReach = Math.max(furthestReach, i + nums[i]);
    
    // If we've reached the boundary of our current jump
    if (i === currentJumpEnd) {
      // Make a jump and update the boundary
      jumps++;
      currentJumpEnd = furthestReach;
    }
  }
  
  return jumps;
};
