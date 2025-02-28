/**
 * @param {number} side - Length of the square's side
 * @param {number[][]} points - Array of points on the boundary of the square
 * @param {number} k - Number of points to select
 * @return {number} - Maximum possible minimum Manhattan distance
 */
const maxDistance = (side, points, k) => {
    const numPoints = points.length;
    // Convert 2D coordinates to 1D positions along the perimeter
    const perimeterPositions = new Array(numPoints);
    
    // Map 2D coordinates to 1D positions along the perimeter
    for (let i = 0; i < numPoints; i++){
        const [x, y] = points[i];
        let position;
        // Bottom edge: y=0, position = x
        if (y === 0) {
            position = x;
        } 
        // Right edge: x=side, position = side + y
        else if (x === side) {
            position = side + y;
        } 
        // Top edge: y=side, position = 2*side + (side-x) [moving right to left]
        else if (y === side) {
            position = 2 * side + (side - x);
        } 
        // Left edge: x=0, position = 3*side + (side-y) [moving top to bottom]
        else {
            position = 3 * side + (side - y);
        }
        perimeterPositions[i] = position;
    }
    
    // Sort positions in ascending order
    perimeterPositions.sort((a, b) => a - b);
    
    // Total perimeter length
    const perimeterLength = 4 * side;
    // Size of the extended array
    const extendedArraySize = numPoints * 2;
    // Extended array that repeats positions to handle circular nature of perimeter
    const extendedPositions = new Array(extendedArraySize);
    for (let i = 0; i < numPoints; i++){
        extendedPositions[i] = perimeterPositions[i];
        extendedPositions[i + numPoints] = perimeterPositions[i] + perimeterLength; // Add perimeter length to create circular representation
    }

    /**
     * Check if it's possible to place k points with minimum distance
     * @param {number} minDistance - Minimum distance to check
     * @return {boolean} - Whether placement is possible
     */
    const canPlacePointsWithMinDistance = function(minDistance) {
        // Try each point as a starting point
        for (let startIndex = 0; startIndex < numPoints; startIndex++){
            let currentIndex = startIndex; // Current position index
            let lastPosition = extendedPositions[startIndex]; // Last placed point's position
            let isValidPlacement = true; // Flag to track if current placement is valid
            const searchLimit = startIndex + numPoints; // Upper bound for search in extended array
            
            // Try to place k-1 more points
            for (let pointsPlaced = 1; pointsPlaced < k; pointsPlaced++){
                const targetPosition = lastPosition + minDistance; // Target position for next point
                
                // Binary search to find next valid point
                let searchLow = currentIndex + 1, searchHigh = searchLimit;
                while (searchLow < searchHigh) {
                    const mid = Math.floor((searchLow + searchHigh) / 2);
                    if (extendedPositions[mid] < targetPosition)
                        searchLow = mid + 1;
                    else
                        searchHigh = mid;
                }
                
                // If no valid point found, this placement fails
                if (searchLow === searchLimit) {
                    isValidPlacement = false;
                    break;
                }
                
                // Update current position and last placed point
                currentIndex = searchLow;
                lastPosition = extendedPositions[currentIndex];
            }
            
            // Check if the distance from last point back to first point is also ≥ minDistance
            if (isValidPlacement && (extendedPositions[startIndex] + perimeterLength - lastPosition >= minDistance))
                return true;
        }
        return false;
    }

    // Binary search to find maximum possible minimum distance
    let minDistanceLow = 0, minDistanceHigh = 2 * side;
    let maxMinDistance = 0;
    
    while (minDistanceLow <= minDistanceHigh) {
        const midDistance = Math.floor((minDistanceLow + minDistanceHigh + 1) / 2);
        
        if (canPlacePointsWithMinDistance(midDistance)) {
            maxMinDistance = midDistance; // We can achieve this distance, try for larger
            minDistanceLow = midDistance + 1;
        } else {
            minDistanceHigh = midDistance - 1; // Can't achieve this distance, try smaller
        }
    }
    
    return maxMinDistance; // Return the maximum possible minimum distance
};
