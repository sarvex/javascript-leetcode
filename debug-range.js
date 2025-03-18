// Direct check function
const isBeautiful = num => {
  const digits = String(num)
  let sum = 0
  let product = 1
  
  for (const digit of digits) {
    const d = Number(digit)
    sum += d
    product *= d
  }
  
  return sum > 0 && product % sum === 0
}

// Check each number in range [20, 100]
console.log('Beautiful numbers between 20 and 100:')
const beautiful = []
for (let i = 20; i <= 100; i++) {
  if (isBeautiful(i)) {
    beautiful.push(i)
  }
}
console.log(beautiful)
console.log(`Total count: ${beautiful.length}`)
