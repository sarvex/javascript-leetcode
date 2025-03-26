/**
 * Optimized approach using cumulative skill sums
 *
 * @intuition We can solve this by tracking the start time of each potion at the first wizard and using cumulative skill sums to calculate finish times.
 *
 * @approach
 * 1. Precompute cumulative sum of skills
 * 2. For each potion, calculate the minimum start time at the first wizard based on constraints
 * 3. The constraints ensure no wizard waits and potions flow properly
 * 4. The final result is the start time of the last potion plus its total processing time
 *
 * @complexity
 * Time: O(m * n), where m is the number of potions, n is the number of wizards
 * Space: O(n), for storing the cumulative skill sums
 *
 * @param {number[]} skill - Skill levels of wizards
 * @param {number[]} mana - Mana capacity of potions
 * @return {number} - Minimum time to brew all potions
 */
const minTime = (skill, mana) => {
  const wizardCount = skill.length
  const potionCount = mana.length

  // Precompute cumulative sum of skills
  const cumulativeSkill = Array(wizardCount)
  cumulativeSkill[0] = skill[0]
  for (let wizardIdx = 1; wizardIdx < wizardCount; wizardIdx++) {
    cumulativeSkill[wizardIdx] = cumulativeSkill[wizardIdx - 1] + skill[wizardIdx]
  }

  // Track the start time of the current potion at the first wizard
  let currentPotionStartTime = 0 // First potion starts at time 0

  // Iterate through potions and update their start times
  for (let potionIdx = 1; potionIdx < potionCount; potionIdx++) {
    // The constraint from the first wizard
    let minTimeDelta = skill[0] * mana[potionIdx - 1]

    // Check constraints from all wizard transitions
    for (let wizardIdx = 0; wizardIdx < wizardCount - 1; wizardIdx++) {
      // Calculate time difference required to avoid waiting
      const timeDifference =
        cumulativeSkill[wizardIdx + 1] * mana[potionIdx - 1] - cumulativeSkill[wizardIdx] * mana[potionIdx]

      if (timeDifference > minTimeDelta) {
        minTimeDelta = timeDifference
      }
    }

    // Update the start time for the current potion
    currentPotionStartTime += minTimeDelta
  }

  // The finish time is the start time of the last potion plus its total processing time
  const lastPotionTotalTime = cumulativeSkill[wizardCount - 1] * mana[potionCount - 1]
  return currentPotionStartTime + lastPotionTotalTime
}

module.exports = minTime
