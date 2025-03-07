/**
 * @param {number} millis
 * @return {Promise}
 */
const sleep = (millis) => new Promise(r => setTimeout(r, millis));

/**
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */
