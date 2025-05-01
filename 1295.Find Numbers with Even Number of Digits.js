/**
 * Find Numbers with Even Number of Digits — uses functional array methods for clarity and performance
 *
 * @intuition Convert each number to string and count those with even digit length
 * @approach Use Array.prototype.filter to select numbers with even digit count, then return the count
 * @complexity Time: O(n), where n is the length of nums
 * @complexity Space: O(1), ignoring output and input
 * @param {number[]} nums - Array of integers
 * @returns {number} Count of numbers with even number of digits
 */
const findNumbers = (nums) => nums.filter((num) => String(num).length % 2 === 0).length
