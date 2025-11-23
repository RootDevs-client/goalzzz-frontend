import MatchCard from '@/app/match/_components/MatchCard';
import GlobalLoading from '@/components/Global/GlobalLoading';

export default function FavoritesMatches({
  userProfile,
  notLoggedIn,
  favoriteMatchesData,
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
    <div className="flex flex-col items-center">
      <div className="bg-white h-12 w-full -skew-y-[0.5deg]">
        <div className="skew-y-[0.5deg] ">
          <div>
            {notLoggedIn ? (
              <div className="flex flex-col items-center justify-center h-full">
                <img
                  src="/images/vector_competitions_fav.png"
                  alt="favorite graphics"
                  className="w-8/12 h-auto"
                />
                <h4 className="p-2 px-4 text-red-500">
                  Please log in first and add your favorite matches
                </h4>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mt-2">
                  {/* Add header if needed */}
                  {/* <h4 className="text-gray-900 text-[16px] font-semibold uppercase">
                    League Name
                  </h4>
                  <FiChevronRight className="text-xl" /> */}
                </div>

                {favoriteMatchesData?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src="/images/vector_competitions_fav.png"
                      alt="favorite graphics"
                      className="w-auto h-60"
                    />
                    <p className="p-2 text-gray-600">
                      You haven{"'"}t added any favorites yet. Discover matches
                      and add them to your favorites!
                    </p>
                  </div>
                ) : (
                  <div>
                    {favoriteMatchesData?.map((match) => (
                      <MatchCard
                        key={match.id}
                        match={match}
                        userProfile={userProfile}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
