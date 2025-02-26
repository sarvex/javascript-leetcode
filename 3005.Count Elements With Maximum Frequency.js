/**
 * @param {number[]} nums
 * @return {number}
 */
const maxFrequencyElements = (nums) => {
  // Edge case: empty array
  if (nums.length === 0) return 0;

  // Use a Map to count frequencies
  const frequencyMap = new Map();
  let maxFrequency = 0;

  // Count frequencies and track the maximum frequency
  for (const num of nums) {
    const newFreq = (frequencyMap.get(num) || 0) + 1;
    frequencyMap.set(num, newFreq);
    maxFrequency = Math.max(maxFrequency, newFreq);
  }

  // Count elements with the maximum frequency
  let totalCount = 0;
  for (const frequency of frequencyMap.values()) {
    if (frequency === maxFrequency) {
      totalCount += maxFrequency;
    }
  }

  return totalCount;
};
