import GlobalLoading from '@/components/Global/GlobalLoading';
import FavoriteLeagueCard from './FavoriteLeagueCard';

export default function FavoriteLeagues({
  leagues,
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
            Please log in first and add your favorite leagues
          </h4>
        </div>
      ) : (
        <>
          {leagues.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <img
                src="/images/vector_competitions_fav.png"
                alt="favorite graphics"
                className="w-auto h-60"
              />
              <p className="p-2 text-gray-600">
                You haven{"'"}t added any favorite leagues yet. Discover leagues
                and add them to your favorites!
              </p>
            </div>
          ) : (
            <div>
              {leagues.map((league) => (
                <FavoriteLeagueCard key={league.id} league={league} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
