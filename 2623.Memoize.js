/**
 * @param {Function} fn - The function to be memoized
 * @return {Function} A memoized function that caches results based on input arguments
 */
const memoize = (fn) => {
  const resultCache = {};
  
  return (...args) => {
    const cacheKey = JSON.stringify(args);
    
    if (cacheKey in resultCache) {
      return resultCache[cacheKey];
    }
    
    const result = fn(...args);
    resultCache[cacheKey] = result;
    
    return result;
  };
};

/**
 * Example usage:
 * 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *   callCount += 1;
 *   return a + b;
 * });
 * 
 * memoizedFn(2, 3); // 5
 * memoizedFn(2, 3); // 5 (uses cached result)
 * console.log(callCount); // 1
 */
