/**
 * @param {string} word
 * @return {number}
 */
const minimumPushes = (word) => {
    const n = word.length;

    // Calculate the distribution of letters across 8 keys (2-9)
    // First distribute letters evenly, then add extras
    const lettersPerKey = Math.floor(n / 8);
    const extraKeys = n % 8;

    // Total pushes calculation:
    // - First lettersPerKey letters on each key cost 1, 2, 3, ... lettersPerKey
    // - Any extra keys have one additional letter costing (lettersPerKey+1)

    // Base case: all keys have lettersPerKey letters
    let totalPushes = 0;

    if (lettersPerKey > 0) {
        // For 8 keys with lettersPerKey letters each
        const pushesPerFullKey = (lettersPerKey * (lettersPerKey + 1)) / 2;
        totalPushes = 8 * pushesPerFullKey;
    }

    // Add extra pushes for the keys that have one more letter
    totalPushes += extraKeys * (lettersPerKey + 1);

    return totalPushes;
};
