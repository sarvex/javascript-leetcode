/**
 * Calculates the number of combinations that make up a given amount using provided coins
 * 
 * @param {number} amount - The target amount
 * @param {number[]} coins - Array of different coin denominations
 * @return {number} - Number of combinations that make up the amount
 * 
 * @intuition
 * This is a classic dynamic programming problem where we need to count the ways to make change.
 * We can solve it using a bottom-up approach, building solutions for smaller amounts first.
 * 
 * @approach
 * 1. Create a DP array where dp[i] represents the number of ways to make amount i
 * 2. Initialize dp[0] = 1 (there's one way to make amount 0: use no coins)
 * 3. For each coin, update the dp array for all amounts from coin value to target amount
 * 4. For each amount j, add the number of ways to make amount (j - coin value)
 * 5. This approach ensures we count each unique combination exactly once
 * 
 * @complexity
 * Time complexity: O(amount * n) where n is the number of coin denominations
 * Space complexity: O(amount) for the dp array
 */
const change = (amount, coins) => {
    // Create a dp array to store the number of ways to make each amount
    const dp = Array(amount + 1).fill(0);
    
    // Base case: there's one way to make amount 0 (use no coins)
    dp[0] = 1;
    
    // For each coin, update the dp array
    for (const coin of coins) {
        // Start from the coin value to avoid negative indices
        for (let currentAmount = coin; currentAmount <= amount; ++currentAmount) {
            // Add the number of ways to make (currentAmount - coin)
            dp[currentAmount] += dp[currentAmount - coin];
        }
    }
    
    // Return the number of ways to make the target amount
    return dp[amount];
};
