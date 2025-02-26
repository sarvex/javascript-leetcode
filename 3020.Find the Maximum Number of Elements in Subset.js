/**
 * @param {number[]} nums
 * @return {number}
 */
const maximumLength = (nums) => {
    // Count frequencies of each number
    const frequencyMap = new Map();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    // Special case: If there's only one unique number and it's not 1
    if (frequencyMap.size === 1 && !frequencyMap.has(1)) {
        return 1;
    }

    let maxLength = 1;

    // Process each unique number in the array
    for (const [num, freq] of frequencyMap) {
        // Skip number 1, handle it separately
        if (num === 1) continue;

        // Start with current number and look for square roots
        let currentNum = num;
        let length = 1;

        // Find pattern by looking for square roots
        while (currentNum >= 2) { // Avoid infinite loop with numbers < 2
            const squareRoot = Math.pow(currentNum, 0.5);

            // Square root must be a perfect square (integer)
            if (squareRoot !== Math.floor(squareRoot)) break;

            // Check if square root exists in our array
            if (frequencyMap.has(squareRoot)) {
                // Square root must appear at least twice to be included
                if (frequencyMap.get(squareRoot) >= 2) {
                    length += 2; // Add 2 to length (for both sides of pattern)
                    currentNum = squareRoot; // Continue with square root
                } else {
                    break; // Not enough occurrences
                }
            } else {
                break; // Square root not found
            }
        }

        maxLength = Math.max(maxLength, length);
    }

    // Special case for number 1
    if (frequencyMap.has(1)) {
        const onesCount = frequencyMap.get(1);
        // For 1s, use odd length if possible (largest odd number ≤ count)
        const onesLength = onesCount % 2 === 0 ? onesCount - 1 : onesCount;
        maxLength = Math.max(maxLength, onesLength);
    }

    return maxLength;
};
