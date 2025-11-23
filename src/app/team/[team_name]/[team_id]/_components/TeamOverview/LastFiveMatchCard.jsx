function calculateTeamScores(scores, teamId) {
  let teamOneScore = 0;
  let teamTwoScore = 0;

  scores?.forEach((item) => {
    if (item.description === 'CURRENT') {
      if (item.participant_id === parseInt(teamId)) {
        teamOneScore = item.score?.goals || 0;
      } else {
        teamTwoScore = item.score?.goals || 0;
      }
    }
  });

  return { teamOneScore, teamTwoScore };
}

export default function LastFiveMatchCard({ match, teamId }) {
  const { scores, participants } = match;

  const { teamOneScore, teamTwoScore } = calculateTeamScores(scores, teamId);

  const status =
    teamOneScore === teamTwoScore
      ? 'D'
      : teamOneScore > teamTwoScore
      ? 'W'
      : 'L';

  const statusStyles = {
    D: 'bg-white text-black border border-black',
    W: 'bg-green-500 text-white',
    L: 'bg-red-500 text-white',
  };

  const awayTeam = participants.find((team) => team.id != teamId);

  return (
    <div className="w-fit">
      <div
        className={`h-10 w-full px-3 sm:px-0 sm:h-14 sm:w-24 flex items-center justify-center ${statusStyles[status]}`}
      >
        {`${teamOneScore} - ${teamTwoScore}`}
      </div>
      {awayTeam && (
        <img
          src={awayTeam.image_path}
          alt="team image"
          className="w-9 h-9 sm:w-12 sm:h-12 rounded-full mx-auto mt-2 ring-1 ring-black p-0.5"
        />
      )}
    </div>
  );
}
