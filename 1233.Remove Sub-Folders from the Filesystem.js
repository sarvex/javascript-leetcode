/**
 * @param {string[]} folder - Array of folder paths
 * @return {string[]} - Array of folder paths without any subfolders
 * 
 * @intuition Sort folders by length to process shorter paths first, then check if longer paths
 * have parent folders already in our result set
 * 
 * @approach 
 * 1. Sort folders by length (shortest first)
 * 2. Add all folders of the shortest length to our result set
 * 3. For each remaining folder, check if any parent folder exists in our set
 * 4. If no parent folder exists, add it to our result set
 * 
 * @complexity Time: O(n log n) where n is the number of folders
 * @complexity Space: O(n) for storing the result set
 */
const removeSubfolders = (folder) => {
  // Sort by length to process shorter paths first
  folder.sort((a, b) => a.length - b.length);
  
  const set = new Set();
  let index = 0;
  const startLength = folder[0].length;
  
  // Add all folders of the shortest length to our set
  while (index < folder.length && folder[index].length === startLength) {
    set.add(folder[index]);
    index++;
  }
  
  // Process remaining folders
  for (let i = index; i < folder.length; i++) {
    const currFolder = folder[i];
    let parentExists = false;
    
    // Check each possible parent path
    for (let j = 1; j < currFolder.length; j++) {
      if (currFolder[j] === '/') {
        const possibleParent = currFolder.substring(0, j);
        if (set.has(possibleParent)) {
          parentExists = true;
          break;
        }
      }
    }
    
    // If no parent exists, add this folder to our set
    if (!parentExists) set.add(currFolder);
  }
  
  return Array.from(set);
}
