/**
 * @param {string[]} words
 * @param {number[][]} queries
 * @return {number[]}
 */
const vowelStrings = (words, queries) => {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u'])
  const result = new Array(words.length + 1).fill(0)

  words.forEach((w, i) => {
    result[i + 1] = result[i] + (vowels.has(w[0]) && vowels.has(w.at(-1)))
  })

  return queries.map(([l, r]) => result[r + 1] - result[l])
}
