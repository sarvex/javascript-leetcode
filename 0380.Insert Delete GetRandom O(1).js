/**
 * HashMap + Array approach for O(1) operations
 * @intuition Use a map for O(1) lookups and an array for O(1) random access
 * @approach Store values in an array and their indices in a map. For removal, swap with the last element to achieve O(1)
 * @complexity Time O(1) for all operations
 * @complexity Space O(n) where n is the number of elements
 */
var RandomizedSet = function() {
    this.map = new Map(); // stores value -> index mapping
    this.values = []; // stores the actual values
};

/** 
 * Inserts a value to the set
 * @param {number} val - The value to insert
 * @return {boolean} - True if the value was not present, false otherwise
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.map.has(val)) {
        return false;
    }
    this.map.set(val, this.values.length);
    this.values.push(val);
    return true;
};

/** 
 * Removes a value from the set
 * @param {number} val - The value to remove
 * @return {boolean} - True if the value was present, false otherwise
 */
RandomizedSet.prototype.remove = function(val) {
    if (!this.map.has(val)) {
        return false;
    }
    
    const idx = this.map.get(val);
    const lastVal = this.values[this.values.length - 1];
    
    // Replace the value to remove with the last value
    this.values[idx] = lastVal;
    this.map.set(lastVal, idx);
    
    // Remove the last element and delete the mapping
    this.values.pop();
    this.map.delete(val);
    
    return true;
};

/**
 * Returns a random element from the set
 * @return {number} - A random element from the set
 */
RandomizedSet.prototype.getRandom = function() {
    return this.values[Math.floor(Math.random() * this.values.length)];
};

/** 
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
