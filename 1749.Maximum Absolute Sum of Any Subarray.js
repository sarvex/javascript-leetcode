/**
 * @param {number[]} nums
 * @return {number}
 */
const maxAbsoluteSum = (nums) => {
    // Use prefix sum approach to find max absolute sum
    let prefixSum = 0;
    let maxPrefix = 0;
    let minPrefix = 0;

    for (const num of nums) {
        prefixSum += num;

        // Update max and min prefix sums
        maxPrefix = Math.max(maxPrefix, prefixSum);
        minPrefix = Math.min(minPrefix, prefixSum);
    }

    // The maximum absolute subarray sum is the maximum difference between prefix sums
    return maxPrefix - minPrefix;
};
