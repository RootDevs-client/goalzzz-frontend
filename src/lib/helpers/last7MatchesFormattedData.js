export function last7MatchesFormattedData(apiResponse) {
  if (!apiResponse || !apiResponse.latest || apiResponse.latest.length === 0) {
    return [];
  }

  const latestMatches = apiResponse.latest.slice(0, 7);

  const result = latestMatches
    .map((latestMatch) => {
      const participants = latestMatch.participants;

      if (participants.length !== 2) {
        return null;
      }

      const teamOne = participants.find(
        (participant) => participant.meta.location === 'home'
      );
      const teamTwo = participants.find(
        (participant) => participant.meta.location === 'away'
      );

      if (!teamOne || !teamTwo) {
        return null;
      }

      const teamOneGoals =
        latestMatch.scores.find(
          (score) =>
            score.description === 'CURRENT' &&
            score.score.participant === 'home'
        )?.score.goals || 0;

      const teamTwoGoals =
        latestMatch.scores.find(
          (score) =>
            score.description === 'CURRENT' &&
            score.score.participant === 'away'
        )?.score.goals || 0;

      return {
        fixtureId: latestMatch.id,
        team_one: {
          id: teamOne.id,
          image: teamOne.image_path,
          goal: teamOneGoals,
          name: teamOne.name,
        },
        team_two: {
          id: teamTwo.id,
          image: teamTwo.image_path,
          goal: teamTwoGoals,
          name: teamTwo.name,
        },
      };
    })
    .filter(Boolean);

  return result;
}
