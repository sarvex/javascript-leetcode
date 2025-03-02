/**
 * @param {number} n - Number of steps to climb
 * @return {number} - Number of distinct ways to climb to the top
 * 
 * Solution approach:
 * This is a classic Fibonacci sequence problem where:
 * F(n) = F(n-1) + F(n-2)
 * 
 * For each step, we can either:
 * 1. Take 1 step from the (n-1)th stair
 * 2. Take 2 steps from the (n-2)th stair
 * 
 * We use an iterative approach with constant space complexity
 * instead of recursion to avoid stack overflow for large inputs.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
const climbStairs = (n) => {
    // Base cases are handled implicitly in the loop
    
    // Initialize Fibonacci sequence with F(0) = 0 and F(1) = 1
    let previous = 0;
    let current = 1;
    
    // Calculate F(n+1) which represents the number of ways to climb n stairs
    for (let i = 0; i < n; ++i) {
        const next = previous + current;
        previous = current;
        current = next;
    }
    
    return current;
};
