/**
 * @param {string} s
 * @return {number}
 */
const countKeyChanges = (s) => {
    if (s.length <= 1) return 0;

    // Convert to lowercase once to compare without case sensitivity
    const lowerS = s.toLowerCase();

    let keyChanges = 0;

    // Use basic for loop with index - more efficient
    for (let i = 1; i < lowerS.length; i++) {
        if (lowerS[i] !== lowerS[i - 1]) {
            keyChanges++;
        }
    }

    return keyChanges;
};
