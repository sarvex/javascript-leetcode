/**
 * @param {string} word
 * @return {number}
 */
const minimumPushes = (word) => {
    // Use regular array instead of Uint16Array to handle frequencies exceeding 65535
    const frequencies = new Array(26).fill(0);

    // Cache the base character code to avoid repeated calculations
    const aCode = 97; // 'a'.charCodeAt(0) = 97

    // Count frequencies - use direct indexing
    const len = word.length;
    for (let i = 0; i < len; i++) {
        frequencies[word.charCodeAt(i) - aCode]++;
    }

    // Only sort non-zero frequencies for optimization
    const nonZeroFreq = [];
    for (let i = 0; i < 26; i++) {
        if (frequencies[i] > 0) {
            nonZeroFreq.push(frequencies[i]);
        }
    }

    // Sort in descending order
    nonZeroFreq.sort((a, b) => b - a);

    // Calculate minimum pushes using bit shifting (>> 3 is equivalent to Math.floor(i / 8))
    let result = 0;
    const freqLen = nonZeroFreq.length;
    for (let i = 0; i < freqLen; i++) {
        result += ((i >> 3) + 1) * nonZeroFreq[i];
    }

    return result;
}
