/**
 * Execute Asynchronous Functions in Parallel
 *
 * @param {Array<Function>} functions - An array of asynchronous functions that return promises
 * @return {Promise<Array>} A promise that resolves to an array containing the results of the input functions
 *
 * @description
 * This function executes multiple asynchronous functions in parallel and returns a promise
 * that resolves to an array of their results in the same order as the input functions.
 * If any of the functions reject, the returned promise immediately rejects with that error.
 *
 * Time Complexity: O(n) where n is the number of functions
 * Space Complexity: O(n) for storing the results
 *
 * Example:
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */
const promiseAll = (functions) => {
  return new Promise((resolve, reject) => {
    let cnt = 0
    const ans = Array.from({ length: functions.length })
    for (let i = 0; i < functions.length; ++i) {
      const f = functions[i]
      f()
        .then((res) => {
          ans[i] = res
          cnt++
          if (cnt === functions.length) {
            resolve(ans)
          }
        })
        .catch((err) => {
          reject(err)
        })
    }
  })
}

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */
