/**
 * @param {string} s
 * @return {string}
 */
var sortString = function (s) {
    const cnt = Array(26).fill(0);
    for (const c of s) {
        ++cnt[c.charCodeAt(0) - 'a'.charCodeAt(0)];
    }
    const ans = [];
    while (ans.length < s.length) {
        for (let i = 0; i < 26; ++i) {
            if (cnt[i]) {
                ans.push(String.fromCharCode(i + 'a'.charCodeAt(0)));
                --cnt[i];
            }
        }
        for (let i = 25; i >= 0; --i) {
            if (cnt[i]) {
                ans.push(String.fromCharCode(i + 'a'.charCodeAt(0)));
                --cnt[i];
            }
        }
    }
    return ans.join('');
};
