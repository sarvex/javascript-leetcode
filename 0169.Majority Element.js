/**
 * Boyer-Moore Voting Algorithm
 * 
 * @intuition
 * The majority element appears more than n/2 times, so its occurrences minus all
 * other elements' occurrences will be positive. We can use a counter to track the
 * current candidate and reset when the counter becomes zero.
 * 
 * @approach
 * 1. Initialize a counter and a candidate variable
 * 2. Iterate through the array:
 *    - If counter is 0, set current element as the candidate
 *    - Increment counter if current element matches candidate, otherwise decrement
 * 3. The final candidate is guaranteed to be the majority element
 * 
 * @complexity
 * Time complexity: O(n) - single pass through the array
 * Space complexity: O(1) - constant extra space
 * 
 * @param {number[]} nums - Array of integers
 * @return {number} - The majority element
 */
const majorityElement = nums => {
    let count = 0;
    let candidate = 0;
    
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
            count = 1;
        } else {
            count += candidate === num ? 1 : -1;
        }
    }
    
    return candidate;
};
