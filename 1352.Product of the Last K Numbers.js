class ProductOfNumbers {
  constructor() {
    this.prefix = [1] // Stores prefix products, initialized with 1.
  }

  /**
   * @param {number} num
   * @return {void}
   */
  add(num) {
    if (num === 0) {
      this.prefix = [1] // Reset if zero is added.
    } else {
      this.prefix.push(this.prefix[this.prefix.length - 1] * num)
    }
  }

  /**
   * @param {number} k
   * @return {number}
   */
  getProduct(k) {
    if (k >= this.prefix.length) {
      return 0 // If `k` exceeds the last reset, return 0.
    }
    return this.prefix[this.prefix.length - 1] / this.prefix[this.prefix.length - 1 - k]
  }
}
