/**
 * Count freq & filter 3-digit evens
 * @intuition
 * precompute input digit frequencies to efficiently filter limited candidate even numbers
 * @approach
 * build inputCount via Array.fill & forEach; generate all even 3-digit numbers; for each, build candidateCount via string split & forEach; use Array.every to compare counts; return filtered list
 * @complexity
 * time: O(n + C * d)
 * space: O(C)
 */
const findEvenNumbers = (digits) => {
  const inputCount = Array(10).fill(0)
  digits.forEach((digit) => ++inputCount[digit])

  return Array.from({ length: 450 }, (_, i) => 100 + 2 * i).filter((number) => {
    const candidateCount = Array(10).fill(0)
    number
      .toString()
      .split('')
      .forEach((char) => ++candidateCount[+char])
    return candidateCount.every((count, digit) => count <= inputCount[digit])
  })
}
