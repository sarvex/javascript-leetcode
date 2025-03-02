/**
 * @param {string[]} words
 * @param {string} pref
 * @return {number}
 */
const prefixCount = (words, pref) => words.reduce((r, s) => r + (s.startsWith(pref) ? 1 : 0), 0)
