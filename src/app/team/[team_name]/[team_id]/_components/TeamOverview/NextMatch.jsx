import MatchStates from '@/app/match/_components/MatchStates';
import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import getShortName from '@/lib/helpers/getShortName';
import getSlugify from '@/lib/helpers/getSlugify';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function NextMatch({ nextMatch }) {
  const { token, isAdmin, user } = useAuthStore();

  const { userProfile, refetchProfile } = useGetUserProfile(
    token,
    isAdmin,
    user
  );

  const isFavorite =
    userProfile?.favorites?.matches.some(
      (item) => parseInt(item.id) === parseInt(nextMatch.id)
    ) || false;

  const [isStarClicked, setIsStarClicked] = useState(isFavorite);

  useEffect(() => {
    if (userProfile) {
      setIsStarClicked(isFavorite);
    }
  }, [isFavorite, userProfile]);

  const handleFavoriteClick = async (event, match) => {
    event.preventDefault();

    if (user) {
      setIsStarClicked(true);

      // Check if the user is an admin
      if (isAdmin) {
        toast.error('Please log in as a user to add matches to favorites.');
        setIsStarClicked(false);
        return;
      }

      const favoriteData = {
        email: user?.phone,
        key: 'matches',
        item: { id: match.id },
      };

      try {
        const { data } = await xoomBackendUrl.put(
          '/api/user/favorites',
          favoriteData
        );

        if (data.status) {
          refetchProfile();
          toast.success('Match added to favorites');
        } else {
          setIsStarClicked(false);
          toast.error('Failed to add match to favorites');
        }
      } catch (error) {
        console.error('Error while adding match to favorites:', error);
        setIsStarClicked(false);
        toast.error('An error occurred while adding match to favorites');
      }
    } else {
      setIsStarClicked(false);
      toast.error('Please login first');
    }
  };

  const handleRemoveFavorite = async (event, match) => {
    event.preventDefault();
    if (user) {
      setIsStarClicked(false);
      const favoriteData = {
        email: user?.phone,
        key: 'matches',
        item: { id: match.id },
      };

      try {
        const { data } = await xoomBackendUrl.put(
          '/api/user/favorites/remove',
          favoriteData
        );

        if (data.status) {
          refetchProfile();
          toast.success('Match removed from favorites');
        } else {
          setIsStarClicked(true);
          toast.error('Failed to add match to favorites');
        }
      } catch (error) {
        console.error('Error while removing from favorites:', error);
        toast.error('Failed to add match to favorites');
      }
    } else {
      setIsStarClicked(true);
      toast.error('Please login first');
    }
  };

  return (
    <div className="bg-base-100 p-5">
      <div className="skew-y-[0.5deg]">
        <div className="flex items-end justify-between ">
          <div className="text-start">
            <h4 className="text-xl font-semibold">Next Match</h4>
            <p className="text-xs font-semibold">
              {moment
                .unix(nextMatch?.starting_at_timestamp)
                .local()
                .format('DD MMMM YYYY')}
            </p>
          </div>

          <h6 className="font-semibold mb-3">Premier League</h6>
        </div>
        <div className="relative w-full">
          <Link
            href={`/match/preview/${getSlugify(
              nextMatch?.participants[0]?.name
            )}-vs-${getSlugify(nextMatch?.participants[1]?.name)}/${
              nextMatch?.id
            }`}
            className="w-full "
          >
            <div className={`bg-base-100 h-auto w-full -skew-y-[0.5deg] mb-1 `}>
              <div
                className={`skew-y-[0.5deg] p-2 grid grid-cols-12 items-center gap-2`}
              >
                <p className="col-span-1 text-gray-400 text-sm font-semibold">
                  {nextMatch?.state?.short_name}
                </p>
                <div className="col-span-3 flex items-center">
                  <img
                    src={nextMatch?.participants[0]?.image_path}
                    alt="team one"
                    className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
                  />
                  <h4 className="text-sm font-semibold uppercase">
                    {getShortName(
                      nextMatch?.participants[0]?.name,
                      nextMatch?.participants[0]?.short_code
                    )}
                  </h4>
                </div>

                <MatchStates match={nextMatch} />
                <div className="col-span-3 flex items-center">
                  <img
                    src={nextMatch?.participants[1]?.image_path}
                    alt="team two"
                    className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
                  />
                  <h4 className="text-sm font-semibold uppercase">
                    {getShortName(
                      nextMatch?.participants[1]?.name,
                      nextMatch?.participants[1]?.short_code
                    )}
                  </h4>
                </div>
              </div>
            </div>
          </Link>
          <div className="col-span-2 mx-auto absolute -top-2 sm:top-6 right-5">
            <button
              onClick={(event) =>
                isStarClicked
                  ? handleRemoveFavorite(event, nextMatch)
                  : handleFavoriteClick(event, nextMatch)
              }
            >
              <img
                src={
                  isStarClicked
                    ? '/icons/star_full_red.png'
                    : '/icons/star_black.png'
                }
                alt="Star logo"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
