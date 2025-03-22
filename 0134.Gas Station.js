/**
 * Greedy approach with circular traversal
 * 
 * @intuition
 * If we start from a station and run out of gas before completing the circuit,
 * then all stations between the starting point and the point where we run out of gas
 * cannot be valid starting points. This is because if we start from any of these stations,
 * we would have even less gas when reaching the failure point.
 * 
 * @approach
 * 1. Start from the last station and move backward to find a potential starting point
 * 2. Use a greedy approach to check if we can complete the circuit
 * 3. Track the total gas surplus/deficit and the number of stations visited
 * 4. If we can visit all stations with a non-negative gas balance, return the starting station
 * 
 * @complexity
 * Time complexity: O(n) where n is the number of gas stations
 * Space complexity: O(1) as we use constant extra space
 * 
 * @param {number[]} gas - Amount of gas available at each station
 * @param {number[]} cost - Cost of gas to travel from current station to next station
 * @return {number} - The starting gas station's index if circuit can be completed, -1 otherwise
 */
const canCompleteCircuit = (gas, cost) => {
  const n = gas.length;
  let i = n - 1; // Potential starting station
  let j = n - 1; // Current station being considered
  let surplus = 0; // Gas surplus/deficit
  let visited = 0; // Number of stations visited
  
  while (visited < n) {
    surplus += gas[j] - cost[j];
    visited++;
    j = (j + 1) % n; // Move to next station in circular manner
    
    // If we have negative surplus, current starting point won't work
    // Move starting point backward
    while (surplus < 0 && visited < n) {
      i--;
      surplus += gas[i] - cost[i];
      visited++;
    }
  }
  
  return surplus < 0 ? -1 : i;
};
