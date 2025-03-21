/**
 * Determines the maximum number of potholes that can be fixed within a given budget.
 * 
 * @intuition
 * First count consecutive potholes ('x') in the road, then greedily fix the longest
 * stretches first as they give the most value per budget unit.
 * 
 * @approach
 * 1. Count consecutive potholes and store frequency of each length
 * 2. Start with longest stretches and fix as many as possible within budget
 * 3. When a stretch can't be fully fixed, break it into smaller stretches
 * 4. Continue until budget is exhausted or all potholes are considered
 * 
 * @complexity
 * Time: O(n) where n is the length of the road
 * Space: O(n) for storing the frequency array
 * 
 * @param {string} road - String representing the road with 'x' as potholes and '.' as fixed parts
 * @param {number} budget - The available budget to fix potholes
 * @return {number} - Maximum number of potholes that can be fixed
 */
const maxPotholes = (road, budget) => {
  const extendedRoad = road + '.';
  const n = extendedRoad.length;
  const stretchFrequency = Array(n).fill(0);
  
  // Count consecutive potholes
  let currentStretch = 0;
  for (const segment of extendedRoad) {
    if (segment === 'x') {
      currentStretch++;
    } else if (currentStretch > 0) {
      stretchFrequency[currentStretch]++;
      currentStretch = 0;
    }
  }
  
  let fixedPotholes = 0;
  
  // Greedily fix longest stretches first
  for (let length = n - 1; length > 0 && budget > 0; length--) {
    const costPerStretch = length + 1;
    const stretchesCanFix = Math.min(Math.floor(budget / costPerStretch), stretchFrequency[length]);
    
    fixedPotholes += stretchesCanFix * length;
    budget -= stretchesCanFix * costPerStretch;
    
    // Remaining stretches get broken into smaller ones
    stretchFrequency[length - 1] += stretchFrequency[length] - stretchesCanFix;
  }
  
  return fixedPotholes;
};
