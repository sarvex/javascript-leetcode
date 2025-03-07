/**
 * Minimizes the maximum number of products allocated to any store
 *
 * @param {number} storeCount - Number of stores available for distribution
 * @param {number[]} quantities - Array of product quantities to be distributed
 * @return {number} - Minimized maximum number of products in any single store
 *
 * Solution Approach:
 * Uses binary search to find the minimum possible maximum allocation.
 * For each potential maximum value, we check if all products can be
 * distributed to the available stores without exceeding that maximum.
 *
 * Time Complexity: O(n * log(max(quantities)))
 * - Binary search takes O(log(max(quantities))) iterations
 * - Each iteration requires O(n) time to check all product quantities
 *
 * Space Complexity: O(1) - Only uses a constant amount of extra space
 */
const minimizedMaximum = (storeCount, quantities) => {
  // Search range: minimum possible is 1, maximum is the largest quantity
  let left = 1;
  let right = Math.max(...quantities);
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    let requiredStores = 0;
    
    // Calculate how many stores are needed with current mid as max allocation
    for (const quantity of quantities) {
      requiredStores += Math.ceil(quantity / mid);
      // Early termination if we exceed the available store count
      if (requiredStores > storeCount) break;
    }
    
    if (requiredStores <= storeCount) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  
  return left;
};
