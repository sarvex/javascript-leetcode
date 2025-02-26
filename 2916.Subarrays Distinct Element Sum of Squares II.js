/**
 * @param {number[]} nums
 * @return {number}
 */
const sumCounts = (nums) => {
  const previousIndices = getPreviousIndices(nums)
  const segmentTree = new SegmentTreeNode(0, nums.length - 1)
  let result = 0
  let currentSquareSum = 0
  
  for (let currentIndex = 0; currentIndex < nums.length; currentIndex++) {
    const previousIndex = previousIndices[currentIndex]
    const distinctElementsCount = currentIndex - 1 - previousIndex
    const contribution = distinctElementsCount + 2 * segmentTree.getSum(previousIndex + 1, currentIndex - 1)
    
    currentSquareSum += contribution + 1
    segmentTree.incrementRange(previousIndex + 1, currentIndex)
    
    result += currentSquareSum
    result %= 1e9 + 7
  }
  
  return result
}

function getPreviousIndices(nums) {
  const lastOccurrence = Array(1e5 + 1).fill(-1)
  const previousIndices = Array(nums.length).fill(-1)
  
  for (let i = 0; i < nums.length; i++) {
    previousIndices[i] = lastOccurrence[nums[i]]
    lastOccurrence[nums[i]] = i
  }
  
  return previousIndices
}

class SegmentTreeNode {
  constructor(lowerBound, upperBound) {
    this.lowerBound = lowerBound
    this.upperBound = upperBound
    this.lazyPropagation = 0
    this.value = 0
    
    if (this.lowerBound < this.upperBound) {
      this.middle = Math.floor((upperBound + lowerBound) / 2)
      this.leftChild = new SegmentTreeNode(lowerBound, this.middle)
      this.rightChild = new SegmentTreeNode(this.middle + 1, this.upperBound)
    } else {
      this.isLeaf = true
    }
  }

  incrementRange(lowerBound, upperBound) {
    if (this.isLeaf) return this.value++
    
    if (lowerBound === this.lowerBound && upperBound === this.upperBound) {
      return this.lazyPropagation++
    }
    
    this.value += upperBound - lowerBound + 1
    
    if (lowerBound <= this.middle) {
      this.leftChild.incrementRange(lowerBound, Math.min(this.middle, upperBound))
    }
    
    if (upperBound >= this.middle + 1) {
      this.rightChild.incrementRange(Math.max(this.middle + 1, lowerBound), upperBound)
    }
  }

  getSum(lowerBound, upperBound) {
    if (this.lazyPropagation) this.propagateLazy()
    
    if (this.isLeaf) return this.value
    
    if (lowerBound === this.lowerBound && upperBound === this.upperBound) {
      return this.value
    }
    
    let sum = 0
    
    if (lowerBound <= this.middle) {
      sum += this.leftChild.getSum(lowerBound, Math.min(this.middle, upperBound))
    }
    
    if (upperBound >= this.middle + 1) {
      sum += this.rightChild.getSum(Math.max(this.middle + 1, lowerBound), upperBound)
    }
    
    return sum
  }

  propagateLazy() {
    this.value += this.lazyPropagation * (this.upperBound - this.lowerBound + 1)
    
    if (!this.isLeaf) {
      this.leftChild.lazyPropagation += this.lazyPropagation
      this.rightChild.lazyPropagation += this.lazyPropagation
    }
    
    this.lazyPropagation = 0
  }
}
