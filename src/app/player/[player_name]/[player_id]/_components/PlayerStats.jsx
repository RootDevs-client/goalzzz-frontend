export default function PlayerStats({ playerData }) {
  if (!playerData?.statistics) {
    return <div>No statistics available for this player.</div>;
  }
  const transformDetailsToObject = (details) =>
    details.reduce((result, { type, value }) => {
      result[type?.developer_name] = value?.total;
      return result;
    }, {});

  const groupedData = playerData.statistics
    .map((season) => ({
      leagueId: season?.season?.league?.id,
      leagueName: season?.season?.league?.name,
      leagueImage: season?.season?.league?.image_path,
      season: season?.season?.name,
      stats: transformDetailsToObject(season?.details),
    }))
    .reduce((result, { leagueId, leagueName, leagueImage, season, stats }) => {
      const key = leagueId || leagueName;

      if (!result[key]) {
        result[key] = {
          leagueId,
          leagueImage,
          leagueName,
          stats: [],
        };
      }

      result[key]?.stats?.push({ season, stats });
      return result;
    }, {});

  const groupedPlayerStats = Object.values(groupedData);

  return (
    <div className="mt-5">
      {groupedPlayerStats.map((league) => (
        <div key={league?.leagueId}>
          <div className="bg-base-100">
            <div className="skew-y-[0.5deg]">
              <div className="flex items-center p-5">
                <img
                  src={league?.leagueImage}
                  alt={league?.leagueName}
                  className="w-10 h-10 ring-1 ring-black mr-4 rounded-full bg-white"
                />
                <h4>{league?.leagueName}</h4>
              </div>
            </div>
          </div>
          <div className="mt-3 skew-y-[0.5deg]">
            {league?.stats
              .sort((a, b) => (a.season < b.season ? 1 : -1))
              .map(({ season, stats }) => (
                <div
                  key={season}
                  className="p-2 font-medium collapse collapse-arrow "
                >
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium grid grid-cols-10 text-[12px] sm:text-base">
                    <div className="col-span-3 sm:col-span-2">{season}</div>
                    <p>{stats?.APPEARANCES || 0}</p>
                    <p>{stats?.MINUTES_PLAYED || 0}</p>
                    <p>{stats?.LINEUPS || 0}</p>
                    <p>{stats?.ASSISTS || 0}</p>
                    <p>{stats?.GOALS_CONCEDED || 0}</p>
                    <p>{stats?.YELLOWCARDS || 0}</p>
                    <p>{stats?.REDCARDS || 0}</p>
                  </div>
                  <div className="collapse-content divide-y">
                    <div className="flex items-center justify-between p-2">
                      <p>Appearance</p>
                      <p>{stats.APPEARANCES || 0}</p>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <p>Minutes Played</p>
                      <p>{stats.MINUTES_PLAYED || 0}</p>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <p>Lineups</p>
                      <p>{stats.LINEUPS || 0}</p>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <p>Assists</p>
                      <p>{stats.ASSISTS || 0}</p>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <p>Goals</p>
                      <p>{stats.GOALS_CONCEDED || 0}</p>
                    </div>

                    <div className="flex items-center justify-between p-2">
                      <p>Yellow Cards</p>
                      <p>{stats?.YELLOWCARDS || 0}</p>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <p>Red Cards</p>
                      <p>{stats?.REDCARDS || 0}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
