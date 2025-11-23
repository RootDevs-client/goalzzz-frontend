import GlobalLoading from '@/components/Global/GlobalLoading';
import FavoriteTeamCard from './FavoriteTeamCard';

export default function FavoritesTeams({
  teams,
  notLoggedIn,

  favoriteMatchesLoading,
}) {
  if (favoriteMatchesLoading) {
    return (
      <>
        <GlobalLoading />
      </>
    );
  }

  return (
    <div>
      {notLoggedIn ? (
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src="/images/vector_competitions_fav.png"
            alt="favorite graphics"
            className="w-8/12 h-auto"
          />
          <h4 className="p-2 px-4 text-red-500">
            Please log in first and add your favorite teams
          </h4>
        </div>
      ) : (
        <>
          {teams.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <img
                src="/images/vector_competitions_fav.png"
                alt="favorite graphics"
                className="w-auto h-60"
              />
              <p className="p-2 text-gray-600">
                You haven{"'"}t added any favorite teams yet. Discover teams and
                add them to your favorites!
              </p>
            </div>
          ) : (
            <div>
              {teams.map((team) => (
                <FavoriteTeamCard key={team?.id} team={team} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
