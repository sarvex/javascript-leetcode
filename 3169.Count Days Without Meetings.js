/**
 * Greedy Approach - Count days without any meetings
 * 
 * @intuition
 * We can sort the meetings by start time and then count the gaps between meetings.
 * Any day that falls within a gap (between the end of one meeting and the start of another)
 * is a day without meetings.
 * 
 * @approach
 * 1. Sort meetings by start time
 * 2. Track the latest end time of meetings we've processed
 * 3. For each meeting, check if there's a gap between the last end time and current start time
 * 4. Add the gap days to our answer
 * 5. Update the last end time to the maximum of current end time and previous last end time
 * 6. Finally, add any days after the last meeting to our answer
 * 
 * @complexity
 * Time complexity: O(n log n) where n is the number of meetings (due to sorting)
 * Space complexity: O(log n) for the sorting algorithm's call stack
 * 
 * @param {number} days - The total number of days
 * @param {number[][]} meetings - Array of meetings where each meeting is [start, end]
 * @return {number} - Number of days without any meetings
 */
const countDays = (days, meetings) => {
  meetings.sort((a, b) => a[0] - b[0]);
  
  let freeDaysCount = 0;
  let lastMeetingEndDay = 0;
  
  for (const [meetingStartDay, meetingEndDay] of meetings) {
    if (lastMeetingEndDay < meetingStartDay) {
      freeDaysCount += meetingStartDay - lastMeetingEndDay - 1;
    }
    lastMeetingEndDay = Math.max(lastMeetingEndDay, meetingEndDay);
  }
  
  // Add days after the last meeting
  freeDaysCount += days - lastMeetingEndDay;
  
  return freeDaysCount;
};
