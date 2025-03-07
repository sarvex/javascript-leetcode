/**
 * @param {number} n
 * @return {Function}
 */
const createCounter = (n) => {
  let i = n
  return () => i++
}

/**
 * const counter = createCounter(10)
 * counter() // 10
 * counter() // 11
 * counter() // 12
 */
