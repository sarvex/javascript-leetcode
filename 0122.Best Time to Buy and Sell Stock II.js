/**
 * Greedy - Buy low, sell high on each profitable transaction
 * 
 * @intuition
 * Since we can buy and sell multiple times, we can capture every profitable price increase.
 * Any time the price goes up from the previous day, we can make a profit.
 * 
 * @approach
 * 1. Iterate through the prices array starting from index 1
 * 2. For each day, check if the price is higher than the previous day
 * 3. If it is, add the price difference to our total profit
 * 4. Return the accumulated profit
 * 
 * @complexity
 * Time complexity: O(n) where n is the length of the prices array
 * Space complexity: O(1) as we only use a single variable to track profit
 * 
 * @param {number[]} prices - Array of stock prices where prices[i] is the price on day i
 * @return {number} - Maximum profit that can be achieved
 */
const maxProfit = (prices) => {
  let profit = 0;
  
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }
  
  return profit;
};
