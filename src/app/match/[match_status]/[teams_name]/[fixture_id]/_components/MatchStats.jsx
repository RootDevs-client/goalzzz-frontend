import GlobalLoading from '@/components/Global/GlobalLoading';
import useMatchStatistics from '@/lib/hooks/useMatchStatistics';

export default function MatchStats({ matchData }) {
  const { matchStatisticsLoading, matchStatisticsData } = useMatchStatistics(
    matchData?.id
  );

  if (matchStatisticsLoading) {
    return (
      <>
        <GlobalLoading />
      </>
    );
  }

  // Extract relevant statistics for home and away teams
  const homeTeamStats = matchStatisticsData.data.statistics.filter(
    (stat) => stat.location === 'home'
  );
  const awayTeamStats = matchStatisticsData.data.statistics.filter(
    (stat) => stat.location === 'away'
  );

  // Define the statistics you want to include in the formatted data
  const desiredStats = [
    {
      name: 'Possession',
      code: 'ball-possession',
      state: { home: 0, away: 0 },
    },
    { name: 'Total Shots', code: 'shots-total', state: { home: 0, away: 0 } },
    { name: 'Shots on Target', code: '', state: { home: 0, away: 0 } },
    { name: 'Fouls', code: 'fouls', state: { home: 0, away: 0 } },
    { name: 'Offsides', code: 'offsides', state: { home: 0, away: 0 } },
    { name: 'Corners Kicks', code: 'corners', state: { home: 0, away: 0 } },
    { name: 'Yellow Cards', code: 'yellowcards', state: { home: 0, away: 0 } },
    { name: 'Red Cards', code: 'redcards', state: { home: 0, away: 0 } },
  ];

  // Format the statistics for home team
  homeTeamStats.forEach((stat) => {
    const statType = stat.type.code;
    const formattedStat = desiredStats.find((item) => item.code === statType);

    if (formattedStat) {
      formattedStat.state.home = stat.data.value;
    }
  });

  // Format the statistics for away team
  awayTeamStats.forEach((stat) => {
    const statType = stat.type.code;
    const formattedStat = desiredStats.find((item) => item.code === statType);

    if (formattedStat) {
      formattedStat.state.away = stat.data.value;
    }
  });

  return (
    <div className="mt-10 skew-y-[0.5deg]">
      {desiredStats.map((stat, index) => (
        <div key={index} className="mx-auto w-fit">
          <div className="flex gap-5 mt-3">
            <progress
              className="progress progress-secondary w-40 sm:w-56 md:w-72 rounded-r-lg rotate-180"
              value={stat.state.home}
              max={stat.state.home + stat.state.away}
            ></progress>
            <progress
              className="progress progress-secondary w-40  sm:w-56 md:w-72 rounded-r-lg"
              value={stat.state.away}
              max={stat.state.home + stat.state.away}
            ></progress>
          </div>
          <div className="flex items-center justify-between mt-3">
            <h4 className="font-semibold">{stat.state.home}</h4>
            <p>{`${stat.name} (%)`}</p>
            <h4 className="font-semibold">{stat.state.away}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}
