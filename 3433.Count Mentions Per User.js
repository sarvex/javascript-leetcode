/**
 * Counts the number of mentions for each user based on events.
 *
 * @intuition
 * Track when users go offline and process different message types:
 * - ALL: Mention all users
 * - HERE: Mention users who have been offline for at least 60 time units
 * - Direct mentions: Parse @u{id} format and increment specific user counts
 * The key insight is tracking offline times rather than online status.
 *
 * @approach
 * 1. Convert timestamps to integers and sort events by time
 * 2. For events with the same timestamp, prioritize OFFLINE events before messages
 * 3. Track the last offline time for each user
 * 4. Process each event based on its type:
 *    - OFFLINE: Update the user's offline timestamp
 *    - MESSAGE/ALL: Increment count for all users
 *    - MESSAGE/HERE: Increment count for users offline for at least 60 time units
 *    - Direct mentions: Parse @u{id} format and increment specific users
 *
 * @complexity
 * Time: O(n log n) where n is the number of events (dominated by sorting)
 * Space: O(u) where u is the number of users
 *
 * @param {number} numberOfUsers - The total number of users
 * @param {string[][]} events - Array of events, each containing [type, timestamp, data]
 * @return {number[]} - Array of mention counts for each user
 */
const countMentions = (numberOfUsers, events) => {
  // Convert timestamps to integers
  const prepareEvents = events => {
    for (const event of events) {
      event[1] = parseInt(event[1], 10);
    }
    return events;
  };

  // Sort events by timestamp with OFFLINE events first for same timestamps
  const sortEvents = events => {
    return events.sort((a, b) => {
      if (a[1] !== b[1]) return a[1] - b[1];
      if (a[0] === "OFFLINE") return -1;
      if (b[0] === "OFFLINE") return 1;
      return 0;
    });
  };

  // Process ALL message - mention all users
  const handleAllMessage = (counts, userCount) => {
    for (let i = 0; i < userCount; i++) {
      counts[i]++;
    }
  };

  // Process HERE message - mention users offline for at least 60 time units
  const handleHereMessage = (counts, offlineTimes, timestamp, userCount) => {
    for (let i = 0; i < userCount; i++) {
      if (timestamp - offlineTimes[i] >= 60) {
        counts[i]++;
      }
    }
  };

  // Parse direct mentions and increment mentioned users
  const handleDirectMentions = (counts, data) => {
    let i = 0;
    while (i < data.length) {
      // Skip "@u" prefix
      i += 2;
      
      // Parse user ID
      let userId = 0;
      while (i < data.length && data.charCodeAt(i) !== 0x20) {
        userId = userId * 10 + (data.charCodeAt(i) - 0x30);
        i++;
      }
      
      // Increment count and skip space
      counts[userId]++;
      i++;
    }
  };

  // Initialize tracking arrays
  const offlineTimes = Array(numberOfUsers).fill(-Infinity);
  const mentionCounts = Array(numberOfUsers).fill(0);
  
  // Prepare and sort events
  const sortedEvents = sortEvents(prepareEvents(events));
  
  // Process each event
  for (const [eventType, timestamp, data] of sortedEvents) {
    if (eventType === "MESSAGE") {
      if (data === "ALL") {
        handleAllMessage(mentionCounts, numberOfUsers);
      } else if (data === "HERE") {
        handleHereMessage(mentionCounts, offlineTimes, timestamp, numberOfUsers);
      } else {
        handleDirectMentions(mentionCounts, data);
      }
    } else if (eventType === "OFFLINE") {
      // Update offline time for user
      const userId = parseInt(data, 10);
      offlineTimes[userId] = timestamp;
    }
  }
  
  return mentionCounts;
};
