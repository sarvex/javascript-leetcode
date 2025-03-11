/**
 * @param {number[]} mountain
 * @return {number[]}
 * @complexity Time: O(n), where n is the length of the input array
 * @complexity Space: O(1)
 * @intuition Find peaks by checking adjacent elements
 * @approach Iterate through the array and check if current element is greater than its neighbors
 */
const findPeaks = (mountain) => {
    const ans = [];
    for (let i = 1; i < mountain.length - 1; ++i) {
        if (mountain[i - 1] < mountain[i] && mountain[i + 1] < mountain[i]) {
            ans.push(i);
        }
    }
    return ans;
}
