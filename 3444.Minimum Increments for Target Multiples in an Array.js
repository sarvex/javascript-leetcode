/**
 * @param {number[]} nums
 * @param {number[]} target
 * @return {number}
 */
const minimumIncrements = (nums, target) => {
  const gcd = (a, b) => {
    if (!b) return a
    return gcd(b, a % b)
  }

  const lcm = (a, b) => {
    return (a / gcd(a, b)) * b
  }

  const k = target.length
  const lcmMap = new Map()

  // Calculate LCM for all possible combinations of target values
  for (let mask = 1; mask < 1 << k; mask++) {
    const subset = []
    for (let i = 0; i < k; i++) {
      if (mask & (1 << i)) {
        subset.push(target[i])
      }
    }

    // Calculate LCM for this subset
    let currentLcm = subset[0]
    for (let j = 1; j < subset.length; j++) {
      currentLcm = lcm(currentLcm, subset[j])
    }

    lcmMap.set(mask, currentLcm)
  }

  // Full mask represents all target values being satisfied
  const fullMask = (1 << k) - 1

  // Initialize DP array with Infinity (representing INT_MAX in C++)
  let dp = new Array(1 << k).fill(Infinity)
  dp[0] = 0 // Base case: no target values satisfied requires 0 operations

  // Process each number in nums
  for (const num of nums) {
    // Calculate cost for each mask
    const maskCost = []
    for (const [mask, lcmValue] of lcmMap.entries()) {
      const remainder = num % lcmValue
      // Cost is 0 if num is already a multiple of lcmValue, otherwise it's lcmValue - remainder
      const cost = remainder === 0 ? 0 : lcmValue - remainder
      maskCost.push([mask, cost])
    }

    // Create a new DP array for this iteration
    const newDp = [...dp]

    // Update DP values
    for (let prevMask = 0; prevMask < 1 << k; prevMask++) {
      if (dp[prevMask] === Infinity) continue

      for (const [mask, cost] of maskCost) {
        // New mask after combining previous mask with current mask
        const newMask = prevMask | mask
        // New cost is the cost of previous mask plus the cost to satisfy current mask
        const newCost = dp[prevMask] + cost

        // Update if this is a better solution
        if (newCost < newDp[newMask]) {
          newDp[newMask] = newCost
        }
      }
    }

    // Update DP array for next iteration
    dp = newDp
  }

  // Return the minimum operations needed to satisfy all target values
  return dp[fullMask] === Infinity ? -1 : dp[fullMask]
}
