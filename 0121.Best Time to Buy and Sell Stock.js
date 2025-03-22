/**
 * Two-pointer sliding window approach
 * 
 * @intuition
 * We can use a sliding window with two pointers to track potential buy and sell days.
 * Left pointer represents the buying day, right pointer represents the selling day.
 * If we find a price lower than our current buy price, we move the buy pointer to that day.
 * 
 * @approach
 * 1. Initialize left (buy) pointer at index 0 and right (sell) pointer at index 1
 * 2. Iterate while right pointer is within array bounds:
 *    - If price at right > price at left, calculate potential profit and update max profit if higher
 *    - If price at right <= price at left, move left pointer to right (found a better buying opportunity)
 *    - Always increment right pointer to check next day
 * 3. Return the maximum profit found
 * 
 * @complexity
 * Time complexity: O(n) - We traverse the array once with the two pointers
 * Space complexity: O(1) - We use constant extra space regardless of input size
 * 
 * @param {number[]} prices - Array of stock prices where prices[i] is the price on day i
 * @return {number} - Maximum profit that can be achieved
 */
const maxProfit = (prices) => {
  let buy = 0;
  let sell = 1;
  let maxProfit = 0;

  while (sell < prices.length) {
    // If current sell price is higher than buy price, calculate potential profit
    if (prices[sell] > prices[buy]) {
      const currentProfit = prices[sell] - prices[buy];
      maxProfit = Math.max(maxProfit, currentProfit);
    } else {
      // Found a lower buy price, update buy pointer
      buy = sell;
    }
    
    // Move sell pointer to next day
    sell++;
  }
  
  return maxProfit;
};
