class EventEmitter {
  constructor() {
    this.events = {}
  }
  /**
   * @param {string} eventName
   * @param {Function} callback
   * @return {Object}
   */
  subscribe(eventName, callback) {
    this.events.set(eventName, (this.events.get(eventName) || new Set()).add(callback))
    return {
      unsubscribe: () => {
        this.events.get(eventName)?.delete(callback)
      },
    }
  }

  /**
   * @param {string} eventName
   * @param {Array} args
   * @return {Array}
   */
  emit(eventName, args = []) {
    const callbacks = this.events.get(eventName)
    if (!callbacks) {
      return []
    }
    return [...callbacks].map((callback) => callback(...args))
  }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */
