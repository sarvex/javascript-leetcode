/**
 * LeetCode 3447: Assign Elements to Groups with Constraints
 * 
 * Each group can only be assigned an element that is a divisor of the group's value.
 * The function returns an array where each value represents the index of the element 
 * assigned to the corresponding group, or -1 if no assignment is possible.
 * 
 * @param {number[]} groups - Array of group values
 * @param {number[]} elements - Array of element values
 * @return {number[]} - Assignment result array
 */
function assignElements(groups, elements) {
  const maxGroupValue = Math.max(...groups);
  const elementAssignments = new Array(maxGroupValue + 1).fill(-1);
  
  // Track which elements have been used to avoid redundant calculations
  const usedElements = new Set();
  
  // Process elements in ascending order for optimal assignments
  const sortedElementIndices = [...elements.keys()].sort((a, b) => elements[a] - elements[b]);
  
  for (const elementIndex of sortedElementIndices) {
    const elementValue = elements[elementIndex];
    
    // Skip if element is too large or already used
    if (elementValue > maxGroupValue || usedElements.has(elementIndex)) {
      continue;
    }
    
    // Map this element to all compatible group values (multiples of elementValue)
    for (let groupValue = elementValue; groupValue <= maxGroupValue; groupValue += elementValue) {
      if (elementAssignments[groupValue] === -1) {
        elementAssignments[groupValue] = elementIndex;
        usedElements.add(elementIndex);
        break; // Each element should only be used once
      }
    }
  }
  
  // Create the final assignment array based on each group's value
  return groups.map(groupValue => elementAssignments[groupValue]);
}

// Export the function for potential use in other modules
module.exports = { assignElements };
