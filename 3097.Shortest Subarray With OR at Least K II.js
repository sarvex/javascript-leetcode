/**
 * Given an array of non-negative integers `nums` and an integer `k`, find the length of the shortest
 * non-empty subarray with a bitwise OR sum of at least `k`. If no such subarray exists, return -1.
 *
 * @param {number[]} nums - Array of non-negative integers
 * @param {number} k - Target threshold for bitwise OR operation
 * @return {number} - Length of shortest subarray with OR sum ≥ k, or -1 if none exists
 *
 * Time: O(n * log(max(nums))), where n is the length of nums
 * Space: O(log(max(nums))), for the bit count array (constant 32 for 32-bit integers)
 */
const minimumSubarrayLength = (nums, k) => {
  if (k === 0) return 1;

  const n = nums.length;
  let minLength = n + 1;
  const bitCounts = Array.from({ length: 32 }, () => 0);

  let left = 0;
  let currentOR = 0;

  for (let right = 0; right < n; right++) {
    currentOR |= nums[right];

    for (let bit = 0; bit < 32; bit++) {
      if ((nums[right] >> bit) & 1) {
        bitCounts[bit]++;
      }
    }

    while (currentOR >= k && left <= right) {
      minLength = Math.min(minLength, right - left + 1);

      const removedElement = nums[left++];

      for (let bit = 0; bit < 32; bit++) {
        if ((removedElement >> bit) & 1 && --bitCounts[bit] === 0) {
          currentOR ^= (1 << bit);
        }
      }
    }
  }

  return minLength === n + 1 ? -1 : minLength;
}
