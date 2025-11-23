export default function TeamResultCircle({ match }) {
  const teamId = match?.participants.find((team) => team.meta === 'home')?.id;

  const { teamOneScore, teamTwoScore } = calculateTeamScores(
    match?.scores,
    teamId
  );

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

  return (
    <div
      className={`col-span-3 w-16 h-16 rounded-full flex flex-col text-xs  ${statusStyles[status]} items-center justify-center mx-auto`}
    >
      <span className="font-semibold">
        {' '}
        {`${teamOneScore} - ${teamTwoScore}`}
      </span>
    </div>
  );
}

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
