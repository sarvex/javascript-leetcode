/**
 * Finds all possible paths from node 0 to node n-1 in a directed acyclic graph
 * 
 * @param {number[][]} graph - The adjacency list representation of the graph
 * @return {number[][]} - All possible paths from source (0) to target (n-1)
 * 
 * @intuition
 * Since we need to find all paths from source to target in a directed acyclic graph (DAG),
 * depth-first search (DFS) is an ideal approach. We can explore all possible paths
 * by traversing the graph and backtracking when necessary.
 * 
 * @approach
 * 1. Start DFS from node 0 (source) with an initial path containing just the source
 * 2. For each node, explore all its neighbors recursively
 * 3. When we reach the target node (n-1), add the current path to our result
 * 4. Use backtracking to explore all possible paths by removing the last node after exploration
 * 
 * @complexity
 * Time complexity: O(2^n * n) where n is the number of nodes in the graph
 *   - There can be up to 2^n possible paths in a DAG in worst case
 *   - Each path can have up to n nodes, and we make a copy of the path when adding to result
 * Space complexity: O(n) for the recursion stack and current path storage
 */
const allPathsSourceTarget = (graph) => {
    const result = [];
    const targetNode = graph.length - 1;
    
    /**
     * DFS helper function to explore all paths
     * @param {number[]} currentPath - The current path being explored
     */
    const dfs = (currentPath) => {
        // Get the last node in the current path
        const currentNode = currentPath[currentPath.length - 1];
        
        // If we've reached the target node, add the current path to results
        if (currentNode === targetNode) {
            result.push([...currentPath]);
            return;
        }
        
        // Explore all neighbors of the current node
        for (const neighbor of graph[currentNode]) {
            // Add neighbor to path
            currentPath.push(neighbor);
            // Recursively explore from this neighbor
            dfs(currentPath);
            // Backtrack by removing the neighbor
            currentPath.pop();
        }
    };

    // Start DFS from source node (0)
    dfs([0]);
    return result;
};
