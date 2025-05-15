/**
 * Greedy take one word per unique adjacent group
 *
 * @intuition contiguous groups can only contribute one word without making adjacent groups equal
 * @approach filter words to include first element and those where group changes
 * @complexity
 * time O(n)
 * space O(n)
 */
const getLongestSubsequence = (words, groups) =>
  words.filter((word, index) => index === 0 || groups[index] !== groups[index - 1])
