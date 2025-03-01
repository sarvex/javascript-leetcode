/**
 * Calculates the number of subarrays with an odd sum.
 *
 * @param {number[]} arr - The input array of integers
 * @return {number} - The count of subarrays with odd sum, modulo 10^9 + 7
 */
const numOfSubarrays = (arr) => {
  // Constants
  const MOD = 1e9 + 7

  // Track counts of even and odd running sums
  // evenCount[0] starts at 1 because empty subarray has sum 0 (even)
  const counts = [1, 0] // [evenCount, oddCount]

  let result = 0
  let runningSum = 0

  // Iterate through each element in the array
  for (const num of arr) {
    // Update running sum
    runningSum += num

    // If current running sum is even, add oddCount to result
    // If current running sum is odd, add evenCount to result
    const isCurrentSumOdd = runningSum & 1
    const countToAdd = counts[(runningSum & 1) ^ 1]

    // Update result with modulo
    result = (result + countToAdd) % MOD

    // Increment the appropriate counter
    counts[isCurrentSumOdd]++
  }

  return result
}
