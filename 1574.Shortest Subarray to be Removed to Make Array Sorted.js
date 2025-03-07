/**
 * Finds the length of the shortest subarray to remove to make the array sorted in non-decreasing order.
 *
 * @param {number[]} arr - The input array
 * @return {number} - The minimum length of subarray to remove
 * 
 * Time Complexity: O(n) where n is the length of the array
 * Space Complexity: O(1)
 */
const findLengthOfShortestSubarray = (arr) => {
  const arrayLength = arr.length;
  
  let suffixStart = arrayLength - 1;
  while (suffixStart > 0 && arr[suffixStart - 1] <= arr[suffixStart]) {
    suffixStart--;
  }
  
  if (suffixStart === 0) return 0;
  
  let minRemovalLength = suffixStart;
  
  let prefixEnd = 0;
  while (prefixEnd < suffixStart && (prefixEnd === 0 || arr[prefixEnd - 1] <= arr[prefixEnd])) {
    while (suffixStart < arrayLength && arr[prefixEnd] > arr[suffixStart]) {
      suffixStart++;
    }
    
    minRemovalLength = Math.min(minRemovalLength, suffixStart - prefixEnd - 1);
    prefixEnd++;
  }
  
  return minRemovalLength;
}
