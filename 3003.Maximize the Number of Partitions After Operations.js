/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const maxPartitionsAfterOperations = (s, k) => {
  if (k === 26) {
    return 1
  }

  const n = s.length
  s = '@' + s + '@'
  const prefixPartitions = new Array(n + 2).fill(0)
  const prefixBitmasks = new Array(n + 2).fill(0)

  let prefixCount = 0
  let currentPrefixMask = 0

  // Calculate prefix partitions
  for (let i = 1; i <= n; i++) {
    const charBit = 1 << (s.charCodeAt(i) - 'a'.charCodeAt(0))
    currentPrefixMask |= charBit
    if (countBits(currentPrefixMask) > k) {
      prefixCount++
      currentPrefixMask = charBit
    }
    prefixPartitions[i] = prefixCount
    prefixBitmasks[i] = currentPrefixMask
  }

  const suffixPartitions = new Array(n + 2).fill(0)
  const suffixBitmasks = new Array(n + 2).fill(0)

  let suffixCount = 0
  let currentSuffixMask = 0

  // Calculate suffix partitions
  for (let i = n; i >= 1; i--) {
    const charBit = 1 << (s.charCodeAt(i) - 'a'.charCodeAt(0))
    currentSuffixMask |= charBit
    if (countBits(currentSuffixMask) > k) {
      suffixCount++
      currentSuffixMask = charBit
    }
    suffixPartitions[i] = suffixCount
    suffixBitmasks[i] = currentSuffixMask
  }

  let maxPartitions = 0

  // Calculate the maximum number of partitions
  for (let i = 1; i <= n; i++) {
    // Start with partitions before and after the current character
    let partitionCount = prefixPartitions[i - 1] + suffixPartitions[i + 1]
    
    // Get the character masks for the left and right sides
    const leftMask = prefixBitmasks[i - 1]
    const rightMask = suffixBitmasks[i + 1]
    const combinedMask = leftMask | rightMask

    // If we change the current character, what's the maximum partitions we can get?
    if (countBits(combinedMask) + 1 <= k) {
      // We can join the left and right parts with the changed character
      partitionCount += 1
    } else if (countBits(leftMask) === k && countBits(rightMask) === k && countBits(combinedMask) < 26) {
      // Special case: both left and right are at max capacity but not all chars are used
      partitionCount += 3
    } else {
      // We need at least two partitions
      partitionCount += 2
    }

    maxPartitions = Math.max(maxPartitions, partitionCount)
  }

  return maxPartitions
}

function countBits(n) {
  let count = 0
  while (n) {
    count += n & 1
    n >>= 1
  }
  return count
}
