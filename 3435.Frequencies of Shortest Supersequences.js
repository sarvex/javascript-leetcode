/**
 * @intuition
 * The key insight is that a shortest common supersequence (SCS) must include all characters
 * from all words with minimal additional characters. By using bit manipulation to represent
 * character sets, we can efficiently find cycles in the dependency graph and determine
 * which characters need to appear multiple times.
 *
 * @approach
 * 1. Map characters to bit positions in a mask
 * 2. Build a directed graph where edges represent character dependencies
 * 3. Detect cycles in the graph using DFS and bit manipulation
 * 4. Find the minimum feedback vertex set (characters that need to appear twice)
 * 5. Generate all possible frequency arrays and select those with minimum set bits
 *
 * @complexity
 * Time: O(n + 2^c) where n is the number of words and c is the number of unique characters
 * Space: O(2^c) for storing the bitmasks and results
 *
 * @param {string[]} words
 * @return {number[][]}
 */
const supersequences = words => {
  // Optimized bit counting function using bit manipulation tricks
  const countSetBits = n => {
    n = n - ((n >> 1) & 0x55555555)
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
    return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24
  }

  // Add a bitmask to result array, maintaining minimal representation
  const addMaskToResults = (results, newMask) => {
    let i = 0
    while (i < results.length) {
      const combinedMask = newMask | results[i]
      
      if (combinedMask === results[i]) {
        // New mask is subset of existing mask, remove the existing one
        results.splice(i, 1)
        i--
      } else if (combinedMask === newMask) {
        // Existing mask is subset of new mask, don't add new mask
        return results
      }
      i++
    }
    
    // Add new mask if it's not a superset of any existing mask
    results.push(newMask)
    return results
  }

  const ASCII_A = 'a'.charCodeAt(0)
  const indexToChar = Array(26).fill(-1)
  let charCount = 0
  const charToIndex = new Map()
  const dependencies = new Map()

  // Process words to build character mappings and dependencies
  for (const word of words) {
    const firstChar = word.charCodeAt(0) - ASCII_A
    const secondChar = word.charCodeAt(1) - ASCII_A
    
    // Map characters to indices
    if (!charToIndex.has(firstChar)) {
      charToIndex.set(firstChar, charCount)
      indexToChar[charCount] = firstChar
      charCount++
    }
    
    if (!charToIndex.has(secondChar)) {
      charToIndex.set(secondChar, charCount)
      indexToChar[charCount] = secondChar
      charCount++
    }
    
    const firstIndex = charToIndex.get(firstChar)
    const secondIndex = charToIndex.get(secondChar)
    
    // Add dependency: first char -> second char
    if (!dependencies.has(firstIndex)) {
      dependencies.set(firstIndex, [])
    }
    
    if (firstIndex === secondIndex) {
      // Self-dependency means this character must appear twice
      dependencies.set(firstIndex, [secondIndex])
    } else if (dependencies.get(firstIndex)[0] !== secondIndex) {
      dependencies.get(firstIndex).push(secondIndex)
    }
  }

  // Find cycles in the dependency graph
  const visited = new Set()
  let cycleMasks = []
  
  for (const [startNode, neighbors] of dependencies) {
    if (!visited.has(startNode)) {
      visited.add(startNode)
      
      // Start DFS from this node
      let currentPaths = new Map()
      currentPaths.set(1 << startNode, [startNode])
      
      while (currentPaths.size > 0) {
        const nextPaths = new Map()
        
        for (const [pathMask, path] of currentPaths) {
          const lastNode = path[path.length - 1]
          
          // Skip if no outgoing edges
          if (!dependencies.has(lastNode)) continue
          
          for (const nextNode of dependencies.get(lastNode)) {
            if ((pathMask & (1 << nextNode)) > 0) {
              // Found a cycle - extract the cycle mask
              const cycleStartIndex = path.indexOf(nextNode)
              let cycleMask = 0
              
              for (let i = cycleStartIndex; i < path.length; i++) {
                cycleMask |= 1 << path[i]
              }
              
              // Add to cycle masks, maintaining minimal representation
              cycleMasks = addMaskToResults(cycleMasks, cycleMask)
            } else {
              if (visited.has(nextNode)) continue
              
              // Continue DFS with this path
              nextPaths.set(pathMask | (1 << nextNode), [...path, nextNode])
            }
          }
        }
        
        currentPaths = nextPaths
      }
    }
  }

  // Generate all possible frequency arrays
  let possibleMasks = new Set([0]) // Start with empty mask
  
  for (const cycleMask of cycleMasks) {
    const nextPossibleMasks = new Set()
    
    for (let nodeIndex = 0; nodeIndex < charCount; nodeIndex++) {
      const nodeBit = 1 << nodeIndex
      
      if ((cycleMask & nodeBit) > 0) {
        // This node is part of a cycle, add it to all existing masks
        for (const mask of possibleMasks) {
          nextPossibleMasks.add(mask | nodeBit)
        }
      }
    }
    
    possibleMasks = nextPossibleMasks
  }

  // Find masks with minimum set bits
  let minSetBits = charCount
  let minimalMasks = []
  
  for (const mask of possibleMasks) {
    const setBits = countSetBits(mask)
    
    if (setBits < minSetBits) {
      minimalMasks = [mask]
      minSetBits = setBits
    } else if (setBits === minSetBits) {
      minimalMasks.push(mask)
    }
  }

  // Convert masks to frequency arrays
  return minimalMasks.map(mask => {
    const frequencyArray = Array(26).fill(0)
    
    for (let i = 0; i < charCount; i++) {
      if ((mask & (1 << i)) === 0) {
        frequencyArray[indexToChar[i]] = 1
      } else {
        frequencyArray[indexToChar[i]] = 2
      }
    }
    
    return frequencyArray
  })
}

module.exports = supersequences
