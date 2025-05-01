class SegmentNode {
    /**
     * Represents a segment with range [start, end]
     * @param {number} start
     * @param {number} end
     */
    constructor(start, end) {
        this.start = start
        this.end = end
        this.leftMax = 1
        this.rightMax = 1
        this.maxRepeat = 1
    }
}

class SegmentTree {
    /**
     * Builds a segment tree for the string
     * @param {string} inputString
     */
    constructor(inputString) {
        this.characters = [...inputString]
        this.tree = Array(inputString.length * 4).fill(null).map(() => new SegmentNode(0, 0))
        const buildTree = (nodeIndex, rangeStart, rangeEnd) => {
            this.tree[nodeIndex] = new SegmentNode(rangeStart, rangeEnd)
            if (rangeStart === rangeEnd) return
            const mid = (rangeStart + rangeEnd) >> 1
            buildTree(nodeIndex << 1, rangeStart, mid)
            buildTree((nodeIndex << 1) | 1, mid + 1, rangeEnd)
            pushUp(nodeIndex)
        }
        const pushUp = nodeIndex => {
            const parent = this.tree[nodeIndex]
            const left = this.tree[nodeIndex << 1]
            const right = this.tree[(nodeIndex << 1) | 1]
            parent.maxRepeat = Math.max(left.maxRepeat, right.maxRepeat)
            parent.leftMax = left.leftMax
            parent.rightMax = right.rightMax
            const leftLen = left.end - left.start + 1
            const rightLen = right.end - right.start + 1
            if (this.characters[left.end - 1] === this.characters[right.start - 1]) {
                if (left.leftMax === leftLen) parent.leftMax += right.leftMax
                if (right.rightMax === rightLen) parent.rightMax += left.rightMax
                parent.maxRepeat = Math.max(parent.maxRepeat, left.rightMax + right.leftMax)
            }
        }
        this._pushUp = pushUp
        buildTree(1, 1, inputString.length)
    }
    /**
     * Updates a character at a position
     * @param {number} nodeIndex
     * @param {number} position
     * @param {string} newChar
     */
    updateCharacter = (nodeIndex, position, newChar) => {
        if (this.tree[nodeIndex].start === position && this.tree[nodeIndex].end === position) {
            this.characters[position - 1] = newChar
            return
        }
        const mid = (this.tree[nodeIndex].start + this.tree[nodeIndex].end) >> 1
        if (position <= mid) this.updateCharacter(nodeIndex << 1, position, newChar)
        else this.updateCharacter((nodeIndex << 1) | 1, position, newChar)
        this._pushUp(nodeIndex)
    }
    /**
     * Queries the maximum repeating character length in a range
     * @param {number} nodeIndex
     * @param {number} queryStart
     * @param {number} queryEnd
     * @returns {number}
     */
    getMaxRepeatLength = (nodeIndex, queryStart, queryEnd) => {
        if (this.tree[nodeIndex].start >= queryStart && this.tree[nodeIndex].end <= queryEnd) return this.tree[nodeIndex].maxRepeat
        const mid = (this.tree[nodeIndex].start + this.tree[nodeIndex].end) >> 1
        let result = 0
        if (queryEnd <= mid) result = this.getMaxRepeatLength(nodeIndex << 1, queryStart, queryEnd)
        else if (queryStart > mid) result = Math.max(result, this.getMaxRepeatLength((nodeIndex << 1) | 1, queryStart, queryEnd))
        else result = Math.max(this.getMaxRepeatLength(nodeIndex << 1, queryStart, queryEnd), this.getMaxRepeatLength((nodeIndex << 1) | 1, queryStart, queryEnd))
        return result
    }
}

/**
 * Efficiently tracks the longest substring of repeating characters after updates
 * @intuition Segment tree enables fast updates and queries on string intervals.
 * @approach For each update, change the character and query the tree for the max repeating length.
 * @complexity Time: O(q log n)
 * @complexity Space: O(n)
 * @param {string} inputString
 * @param {string} updateCharacters
 * @param {number[]} updateIndices
 * @returns {number[]}
 */
const longestRepeating = (inputString, updateCharacters, updateIndices) => {
    const segmentTree = new SegmentTree(inputString)
    const stringLength = inputString.length
    const getResultAfterUpdate = (updateIndex, i) => {
        segmentTree.updateCharacter(1, updateIndex + 1, updateCharacters[i])
        return segmentTree.getMaxRepeatLength(1, 1, stringLength)
    }
    return updateIndices.map(getResultAfterUpdate)
}
