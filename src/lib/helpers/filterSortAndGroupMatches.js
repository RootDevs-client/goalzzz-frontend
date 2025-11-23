// helper.js
export function filterSortAndGroupMatches(matches) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time to the start of today

  const filteredMatches = matches.filter((match) => {
    const matchDate = new Date(match.starting_at);
    return matchDate >= today;
  });

  // Sort the filtered matches by ascending date
  filteredMatches.sort(
    (a, b) => new Date(a.starting_at) - new Date(b.starting_at)
  );

  const groupedMatches = [];

  filteredMatches.forEach((match) => {
    const matchDate = match.starting_at.split(' ')[0];

    // Check if there is already a group for this date
    const existingGroup = groupedMatches.find(
      (group) => group.date === matchDate
    );

    if (existingGroup) {
      // If a group exists for this date, add the match to the matches array of that group
      existingGroup.matches.push(match);
    } else {
      // If no group exists for this date, create a new group
      groupedMatches.push({ date: matchDate, matches: [match] });
    }
  });

  return groupedMatches;
}
