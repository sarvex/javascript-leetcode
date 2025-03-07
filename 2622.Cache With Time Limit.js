/**
 * TimeLimitedCache - A cache with time-limited entries
 * 
 * This class implements a cache where entries expire after a specified duration.
 * It provides methods to set, get, and count cache entries.
 */
var TimeLimitedCache = function() {
  this.data = new Map();        // Stores the actual key-value pairs
  this.timeoutData = new Map(); // Stores timeout IDs for each key
};

/**
 * Sets a key-value pair in the cache with a time limit
 * 
 * @param {number} key - The key to store
 * @param {number} value - The value to associate with the key
 * @param {number} duration - Time until expiration in ms
 * @return {boolean} - Returns true if an unexpired key already existed, false otherwise
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
  // Check if key exists and is not expired
  const keyExists = this.data.has(key);
  
  // If key exists, clear the existing timeout
  if (keyExists) {
    clearTimeout(this.timeoutData.get(key));
  }
  
  // Set the new value
  this.data.set(key, value);
  
  // Set a new timeout to delete the key after duration
  this.timeoutData.set(
    key,
    setTimeout(() => this.data.delete(key), duration)
  );
  
  return keyExists;
};

/**
 * Gets the value associated with a key
 * 
 * @param {number} key - The key to look up
 * @return {number} - The value associated with the key, or -1 if not found
 */
TimeLimitedCache.prototype.get = function(key) {
  return this.data.has(key) ? this.data.get(key) : -1;
};

/**
 * Returns the count of non-expired keys
 * 
 * @return {number} - Count of non-expired keys in the cache
 */
TimeLimitedCache.prototype.count = function() {
  return this.data.size;
}
/**
 * Your TimeLimitedCache object will be instantiated and called as such:
 * var obj = new TimeLimitedCache()
 * obj.set(1, 42, 1000); // false
 * obj.get(1) // 42
 * obj.count() // 1
 */
