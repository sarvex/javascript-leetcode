/**
 * Determines the minimum time needed to repair all cars.
 * 
 * @param {number[]} ranks - Array of mechanic ranks (lower rank = faster repairs)
 * @param {number} cars - Number of cars that need repair
 * @return {number} The minimum time needed to repair all cars
 * 
 * @intuition
 * The time it takes for a mechanic to repair n cars is r * n², where r is the mechanic's rank.
 * We can use binary search to find the minimum time needed to repair all cars.
 * 
 * @approach
 * 1. Define a search space from 1 to the maximum possible time
 * 2. Use binary search to find the minimum time where all cars can be repaired
 * 3. For each time value, check if it's possible to repair all cars
 * 4. Optimize by early termination when total cars repaired exceeds target
 * 
 * @complexity
 * Time: O(n * log(m)), where n is the number of mechanics and m is the maximum possible repair time
 * Space: O(1), constant extra space used
 */
const repairCars = (ranks, cars) => {
  let left = 1;
  const minRank = Math.min(...ranks);
  let right = minRank * cars * cars;
  let result = right;
  
  const canRepairAllCars = (time) => {
    let totalCarsRepaired = 0;
    
    for (const rank of ranks) {
      totalCarsRepaired += Math.floor(Math.sqrt(time / rank));
      
      if (totalCarsRepaired >= cars) {
        return true;
      }
    }
    
    return false;
  };
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (canRepairAllCars(mid)) {
      result = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  
  return result;
};
