/**
 * Calculates the maximum possible coins that can be collected from two lanes
 * with the option to switch lanes up to twice.
 * 
 * @param {number[]} lane1 - Array of coin values in the first lane
 * @param {number[]} lane2 - Array of coin values in the second lane
 * @return {number} - Maximum possible coins that can be collected
 */
const maxCoins = (lane1, lane2) => {
  const laneLength = lane1.length;
  const NEGATIVE_INFINITY = -1e18;
  
  // Create a memoization table:
  // - First dimension: position in the lanes (0 to laneLength-1)
  // - Second dimension: current lane (0 for lane1, 1 for lane2)
  // - Third dimension: remaining lane switches (0 to 2)
  const memoTable = Array.from({ length: laneLength }, () => 
    Array.from({ length: 2 }, () => 
      Array(3).fill(NEGATIVE_INFINITY)
    )
  );

  /**
   * Recursive function with memoization to find the maximum coins
   * @param {number} position - Current position in the lanes
   * @param {number} currentLane - Current lane (0 for lane1, 1 for lane2)
   * @param {number} remainingSwitches - Number of remaining lane switches allowed
   * @return {number} - Maximum coins from this state
   */
  const collectCoins = (position, currentLane, remainingSwitches) => {
    // Base case: reached the end of the lanes
    if (position >= laneLength) {
      return 0;
    }
    
    // Return memoized result if available
    if (memoTable[position][currentLane][remainingSwitches] !== NEGATIVE_INFINITY) {
      return memoTable[position][currentLane][remainingSwitches];
    }
    
    // Get the coin value at the current position in the current lane
    const coinValue = currentLane === 0 ? lane1[position] : lane2[position];
    
    // Option 1: Take the coin and continue in the same lane
    let maxResult = Math.max(
      coinValue, // Just take the coin and end
      collectCoins(position + 1, currentLane, remainingSwitches) + coinValue // Take coin and continue
    );
    
    // Option 2: Switch lanes if switches are available
    if (remainingSwitches > 0) {
      const otherLane = currentLane ^ 1; // Toggle between 0 and 1
      
      // Option 2a: Switch lane, take coin in new lane, and continue
      maxResult = Math.max(
        maxResult,
        collectCoins(position + 1, otherLane, remainingSwitches - 1) + coinValue
      );
      
      // Option 2b: Switch lane immediately without taking current coin
      maxResult = Math.max(
        maxResult,
        collectCoins(position, otherLane, remainingSwitches - 1)
      );
    }
    
    // Memoize the result
    memoTable[position][currentLane][remainingSwitches] = maxResult;
    return maxResult;
  };
  
  // Try starting from each position in the first lane
  let maximumCoins = NEGATIVE_INFINITY;
  
  // Optimization: Start from the end and work backwards
  // This can potentially reduce the number of recursive calls
  for (let startPosition = 0; startPosition < laneLength; ++startPosition) {
    maximumCoins = Math.max(
      maximumCoins, 
      collectCoins(startPosition, 0, 2)
    );
  }
  
  return maximumCoins;
}
