/**
 * @intuition
 * This problem can be modeled as a graph problem where recipes are nodes and dependencies
 * (ingredients needed) are edges. We need to determine which recipes can be created based
 * on available supplies and other recipes that can be created.
 * @approach
 * 1. Use a depth-first search (DFS) approach to check if a recipe can be created
 * 2. For each recipe, recursively check if all its ingredients are available
 * 3. Use a set to detect cycles in the recipe dependencies
 * 4. Memoize results to avoid redundant calculations
 * 5. Handle the case where recipes depend on other recipes
 * @complexity
 * Time: O(N + E) where N is the number of recipes and E is the total number of ingredients
 * Space: O(N) for the recursion stack and memoization
 *
 * @param {string[]} recipes
 * @param {string[][]} ingredients
 * @param {string[]} supplies
 * @return {string[]}
 */
const findAllRecipes = (recipes, ingredients, supplies) => {
  // Map recipe names to their indices for quick lookup
  const recipeMap = new Map();
  for (let i = 0; i < recipes.length; i++) {
    recipeMap.set(recipes[i], i);
  }
  
  // Convert supplies to a set for O(1) lookup
  const availableSupplies = new Set(supplies);
  
  // Set to store recipes we can create
  const creatable = new Set();
  
  // Set to track recipes being checked in current DFS path (cycle detection)
  const visiting = new Set();
  
  /**
   * Check if a recipe can be created using DFS
   * @param {string} recipe - Recipe to check
   * @returns {boolean} - Whether the recipe can be created
   */
  const canCreate = recipe => {
    // If we already know the result, return it
    if (creatable.has(recipe)) return true;
    
    // If we're already checking this recipe (cycle detected)
    if (visiting.has(recipe)) return false;
    
    // Mark recipe as being visited
    visiting.add(recipe);
    
    // Get ingredients for this recipe
    const recipeIngredients = ingredients[recipeMap.get(recipe)];
    
    // Check if all ingredients are available
    for (const ingredient of recipeIngredients) {
      // If ingredient is a supply, continue
      if (availableSupplies.has(ingredient)) continue;
      
      // If ingredient is another recipe, check if it can be created
      if (recipeMap.has(ingredient)) {
        if (!canCreate(ingredient)) return false;
      } else {
        // Ingredient is neither a supply nor a recipe
        return false;
      }
    }
    
    // Remove from visiting since we're done with this path
    visiting.delete(recipe);
    
    // Mark recipe as creatable
    creatable.add(recipe);
    return true;
  };
  
  // Try to create each recipe
  for (const recipe of recipes) {
    canCreate(recipe);
  }
  
  // Return all creatable recipes
  return [...creatable];
};

// Export for testing
module.exports = findAllRecipes;
