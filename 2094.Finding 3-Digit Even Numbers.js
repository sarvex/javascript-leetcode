/**
 * @param {number[]} digits
 * @return {number[]}
 */
var findEvenNumbers = function (digits) {
  // Count occurrences of each digit from the input array.
  const digitCount = Array(10).fill(0)
  for (const digit of digits) {
    ++digitCount[digit]
  }
  const validNumbers = []
  // Check all 3-digit even numbers.
  for (let number = 100; number < 1000; number += 2) {
    // Count digit frequency for the current number.
    const currentNumberDigitCount = Array(10).fill(0)
    for (let temp = number; temp; temp = Math.floor(temp / 10)) {
      ++currentNumberDigitCount[temp % 10]
    }
    // Verify if there are enough digits available.
    let isAvailable = true
    for (let digit = 0; digit < 10 && isAvailable; ++digit) {
      isAvailable = digitCount[digit] >= currentNumberDigitCount[digit]
    }
    if (isAvailable) {
      validNumbers.push(number)
    }
  }
  return validNumbers
}
