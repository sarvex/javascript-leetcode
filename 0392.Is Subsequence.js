/**
 * Determines if string s is a subsequence of string t.
 * A subsequence is a sequence that can be derived from another sequence by deleting some
 * or no elements without changing the order of the remaining elements.
 *
 * @intuition
 * We can use a two-pointer approach to check if s is a subsequence of t.
 * By iterating through t and advancing the pointer for s only when we find a match,
 * we can determine if all characters in s appear in the same order in t.
 *
 * @approach
 * 1. Initialize a pointer i for string s at 0
 * 2. Iterate through string t with pointer j
 * 3. When characters match (s[i] === t[j]), increment i
 * 4. After iteration, if i equals the length of s, then s is a subsequence of t
 *
 * @complexity
 * Time complexity: O(n) where n is the length of string t
 * Space complexity: O(1) as we only use two pointers
 *
 * @param {string} s - The potential subsequence string
 * @param {string} t - The source string
 * @return {boolean} - True if s is a subsequence of t, false otherwise
 */
const isSubsequence = (s, t) => {
  const m = s.length;
  const n = t.length;
  let i = 0;
  
  for (let j = 0; j < n && i < m; ++j) {
    if (s[i] === t[j]) {
      ++i;
    }
  }
  
  return i === m;
};
