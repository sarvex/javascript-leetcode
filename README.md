# JavaScript LeetCode Solutions

A comprehensive collection of optimized JavaScript solutions for LeetCode problems, following modern ECMAScript standards and best practices.

## Overview

This repository contains JavaScript solutions to LeetCode problems, designed with:

- Modern ES2022+ syntax and features
- Optimized algorithms for performance
- Comprehensive documentation with intuition and approach
- Time and space complexity analysis
- Clean, readable, and maintainable code

## Structure

Each solution file follows a consistent naming convention:

```
<problem-number>.<problem-title>.js
```

For example: `0001.Two Sum.js`

## Documentation Style

Solutions include detailed JSDoc comments with:

1. Problem description
2. Intuition - first thoughts on approaching the problem
3. Approach - detailed solution strategy
4. Complexity analysis - time and space complexity
5. Edge cases and considerations

Example:

```javascript
/**
 * Returns the maximum count between positive integers and negative integers in a sorted array.
 * 
 * @param {number[]} nums - The sorted array of integers
 * @return {number} The maximum count between positive integers and negative integers
 * 
 * @intuition
 * Since the array is sorted, we can use binary search to efficiently find the positions
 * where negative numbers end and positive numbers begin.
 * 
 * @approach
 * 1. Use binary search to find the index of the first non-negative number (≥ 0)
 * 2. Use binary search to find the index of the first positive number (≥ 1)
 * 3. Count of negative numbers = index of first non-negative
 * 4. Count of positive numbers = total length - index of first positive
 * 5. Return the maximum of these two counts
 * 
 * @complexity
 * Time: O(log n) where n is the length of the array
 * Space: O(1) constant extra space
 */
```

## Coding Style

Solutions adhere to the following principles:

- Arrow functions for concise syntax
- Descriptive variable names
- Modern array methods (`map`, `filter`, `reduce`, etc.)
- ES2022+ features (optional chaining, nullish coalescing, etc.)
- Immutable data patterns
- Early returns to reduce nesting
- Minimal comments (self-documenting code)

## Usage

These solutions can be:

1. Studied to understand different problem-solving approaches
2. Used as reference when preparing for technical interviews
3. Compared with your own solutions for learning purposes

## Contributing

Contributions are welcome! Please ensure your solutions follow the established patterns:

1. Use arrow functions
2. Include comprehensive JSDoc documentation
3. Follow modern JavaScript best practices
4. Provide clear explanations of approach and complexity
5. Maintain consistent coding style

## License

This repository is available under the MIT License. See the LICENSE file for more details.