/**
 * Tagline: HashMap grouping for minimal rabbit count
 * @intuition Each answer x means the rabbit is in a group of x+1 same-colored rabbits. Count groups needed for each answer.
 * @approach Count occurrences of each answer, then for each, compute how many groups of size x+1 are needed, summing their sizes.
 * @complexity Time: O(n)
 * @complexity Space: O(n)
 * @param {number[]} answers - Array of rabbits' answers
 * @returns {number} Minimal number of rabbits in the forest
 */
export const numRabbits = answers =>
  Array.from(answers.reduce((m, x) => m.set(x, (m.get(x) ?? 0) + 1), new Map()))
    .reduce((total, [x, v]) => total + Math.ceil(v / (x + 1)) * (x + 1), 0)
