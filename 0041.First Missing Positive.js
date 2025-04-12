/**
 * Find the smallest missing positive integer using in-place element rearrangement.
 * @intuition The problem asks for the smallest positive integer (>= 1) not present in the array.
 * Negative numbers, zeros, and numbers larger than the array size `n` are irrelevant to finding the *first* missing *positive*.
 * The key idea is to use the array's indices (0 to n-1) to mark the presence of numbers 1 to n.
 * We can attempt to place each number `k` (where 1 <= k <= n) into index `k-1`.
 * After rearranging, we iterate through the array. The first index `i` where `nums[i]` is not `i+1` signifies that `i+1` is the smallest missing positive integer.
 * If all numbers from 1 to n are in their correct positions, the missing positive is `n+1`.
 * @approach
 * 1. Get the length of the array, `n`.
 * 2. Iterate through the array with index `i` from 0 to `n-1`.
 * 3. For each `nums[i]`, use a `while` loop to place it in its correct position `nums[i]-1`, as long as:
 *    - `nums[i]` is positive (`nums[i] > 0`).
 *    - `nums[i]` is within the valid index range (`nums[i] <= n`).
 *    - `nums[i]` is not already in its correct place (`nums[i] !== nums[nums[i] - 1]`). This prevents infinite loops with duplicates.
 * 4. Inside the `while` loop, swap `nums[i]` with the element at `nums[nums[i] - 1]`.
 * 5. After the rearrangement pass, iterate through the array again from `i = 0` to `n-1`.
 * 6. Return the first index `i + 1` where `nums[i] !== i + 1`.
 * 7. If the loop finishes without finding such an index, it means all integers from 1 to `n` are present, so return `n + 1`.
 * @complexity
 * Time: O(n) - Each number is swapped at most once into its correct position. Both passes are O(n).
 * Space: O(1) - The sorting is done in-place. Only a constant amount of extra space is used.
 * @param {number[]} nums - An unsorted integer array.
 * @returns {number} The smallest missing positive integer.
 */
const firstMissingPositive = (nums) => {
  const n = nums.length;

  // Pass 1: Rearrange numbers to place k at index k-1
  for (let i = 0; i < n; i++) {
    // Use while loop to ensure the number at index i is correctly placed,
    // or is out of bounds/incorrect position after swaps.
    while (
      nums[i] > 0 &&
      nums[i] <= n &&
      nums[i] !== nums[nums[i] - 1] // Check if it's not already in the correct place
    ) {
      // Swap nums[i] with the element at its target index (nums[i] - 1)
      const targetIndex = nums[i] - 1;
      [nums[i], nums[targetIndex]] = [nums[targetIndex], nums[i]]; // Destructuring swap
    }
  }

  // Pass 2: Find the first index i where nums[i] !== i + 1
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  // If all numbers from 1 to n are present
  return n + 1;
};
