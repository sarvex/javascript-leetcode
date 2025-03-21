/**
 * @intuition
 * Skip generating all permutations by using combinatorial math to directly find the k-th alternating permutation.
 * @approach
 * 1. Calculate the total possible alternating permutations
 * 2. Find the index after which we'll have at least k permutations
 * 3. Directly construct the permutation by calculating the position of each number
 * @complexity
 * Time: O(n²) where n is the input size
 * Space: O(n) for storing the result and used numbers
 *
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
const permute = (n, k) => {
  let temp = 1n
  let ct = 2
  let ind = 0
  
  // Count the total number of permutations we can have
  for (let i = n; i >= 1; i--) {
    if (temp >= BigInt(k)) {
      ind = i // After this index we will have at least k permutations
      break // Break to avoid overflow of total permutation count
    }
    
    if (i === 1) {
      if (n % 2 === 1) {
        // If n is odd, we can't have even numbers at the first index
        temp *= BigInt((n + 1) / 2)
      } else {
        temp *= BigInt(n)
      }
    } else {
      // At every index we have (n-i)/2 options (either even or odd)
      temp *= BigInt(Math.floor(ct / 2))
      ct++
    }
  }
  
  // kth permutation doesn't exist
  if (temp < BigInt(k)) return []
  
  const used = new Array(n + 1).fill(false)
  const result = []
  
  // Allot direct values after which at least k permutations are possible
  for (let i = 1; i <= ind; i++) {
    result.push(i)
    used[i] = true
  }
  
  // Calculate the remaining positions
  k = BigInt(k)
  for (let i = ind + 1; i <= n; i++) {
    if (i === 1) {
      if (n % 2 === 1) {
        temp /= BigInt((n + 1) / 2)
      } else {
        temp /= BigInt(n)
      }
    } else {
      temp /= BigInt(Math.floor((n - i + 2) / 2))
    }
    
    // tt is the number of value which will be here amongst the possible values
    let tt = Number(k / temp)
    if (k % temp !== 0n) tt++
    
    // Update k to the remaining permutations
    k -= BigInt(tt - 1) * temp
    
    if (i === 1) {
      if (n % 2 === 1) {
        tt = 2 * tt - 1
      }
      result.push(tt)
      used[tt] = true
    } else {
      // Check the parity of first index
      let par = 1
      if (result[0] % 2 === 0) par = 2
      if (n % 2 === 1) par = 1 // If n is odd, can't have even value
      
      // Check parity at required index
      if ((i - 1) % 2 === 1) {
        par = par === 1 ? 2 : 1
      }
      
      // Find the tt-th unused number with the required parity
      let count = 1
      for (let j = par; j <= n; j += 2) {
        if (used[j]) continue // Skip if already used
        
        if (count === tt) {
          result.push(j)
          used[j] = true
          break
        }
        count++
      }
    }
  }
  
  return result
}

module.exports = permute
