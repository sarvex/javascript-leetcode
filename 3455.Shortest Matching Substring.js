/**
 * @param {string} s
 * @param {string} p
 * @return {number}
 */
const shortestMatchingSubstring = (s, p) => {
  let [op1, op2, op3] = p.split('*')

  if (!op2) {
    op2 = op3
    op3 = ''
  }

  if (!op1) {
    op1 = op2
    op2 = op3
    op3 = ''
  }

  if (!op2 && !op3) return op1.length

  let op1i = findAllIndicesKMP(s, op1)
  let op2i = findAllIndicesKMP(s, op2)
  let op3i = findAllIndicesKMP(s, op3)

  let min = Infinity
  let i2 = 0
  let i3 = 0
  for (let op1Indices of op1i) {
    if (min === p.length - 2) return min
    const [op1S, op1E] = op1Indices
    while (op2i[i2] && op2i[i2][0] <= op1E) i2++
    while (op3i[i3] && op3i[i3][0] <= op2i[i2]?.[1]) i3++

    if (op1S + min < op2i[i2]?.[1]) continue
    if (op1S + min < op3i[i3]?.[1]) continue

    if (!op2i[i2]) break

    if (op3) {
      if (op3i[i3]) {
        const dist = op3i[i3][1] - op1S + 1
        min = Math.min(min, dist)
      }
    } else if (op2i[i2]) {
      const dist = op2i[i2][1] - op1S + 1
      min = Math.min(min, dist)
    }
  }

  return min === Infinity ? -1 : min
}

const findAllIndicesKMP = (s, toFind, startFrom = 0) => {
  if (!toFind) return []
  const indices = []

  // construct table
  const table = [0]
  let m = 0
  for (let i = 1; i < toFind.length; i++) {
    if (toFind[i] === toFind[m]) {
      table[i] = ++m
    } else if (m > 0) {
      m = table[m - 1]
      i--
    } else {
      table[i] = 0
    }
  }

  // kmp
  m = 0
  let i = 0
  while (i < s.length) {
    while (toFind[m] === s[i + m] && m < toFind.length) {
      m++
    }

    if (m === toFind.length) {
      indices.push([i, i + m - 1])
    }

    if (m === 0) {
      i++
      continue
    }

    i += m - table[m - 1]
    m = table[m - 1]
  }

  return indices
}
