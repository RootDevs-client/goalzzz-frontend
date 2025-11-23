import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import getShortName from '@/lib/helpers/getShortName';
import getSlugify from '@/lib/helpers/getSlugify';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function MatchCardH2H({ encounter }) {
  const { token, isAdmin, user } = useAuthStore();

  const { userProfile, refetchProfile } = useGetUserProfile(
    token,
    isAdmin,
    user
  );

  const isFavorite =
    userProfile?.favorites?.matches.some(
      (item) => parseInt(item.id) === parseInt(encounter.id)
    ) || false;

  const [isStarClicked, setIsStarClicked] = useState(isFavorite);

  const handleFavoriteClick = async (event, match) => {
    event.preventDefault();
    if (user) {
      setIsStarClicked(true);

      // Check if the user is an admin
      if (isAdmin) {
        toast.error('Please login as a user to add matches to favorites.');
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
          toast.error('Error');
        }
      } catch (error) {
        console.error('Error while adding to favorites:', error);
        toast.error('An error occurred');
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
    <div key={encounter?.id} className="relative w-full">
      <h4 className="bg-gray-50 p-4 -skew-y-[0deg] ">
        {encounter?.match_time?.split(' ')[0]}
      </h4>
      <Link
        href={`/match/details/${getSlugify(
          encounter?.home_team_name
        )}-vs-${getSlugify(encounter?.home_team_name)}/${encounter?.id}`}
        className="w-full"
      >
        <div className={`h-auto w-full mb-1 bg-gray-200`}>
          <div className={`p-2 grid grid-cols-12 items-center gap-2`}>
            <p className="col-span-1 text-gray-400 text-sm font-semibold">
              {encounter?.match_state}
            </p>
            <div className="col-span-3 flex items-center">
              <img
                src={encounter?.home_team_image}
                alt="team one"
                className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
              />
              <h4 className="text-sm font-semibold uppercase">
                {getShortName(encounter?.home_team_name)}
              </h4>
            </div>

            <div
              className={`col-span-3 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex text-xs bg-primary text-white items-center justify-center mx-auto mr-2`}
            >
              {encounter?.score}
            </div>

            <div className="col-span-3 flex items-center">
              <img
                src={encounter?.away_team_image}
                alt="team two"
                className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
              />
              <h4 className="text-sm font-semibold uppercase">
                {getShortName(encounter?.away_team_name)}
              </h4>
            </div>
          </div>
        </div>
      </Link>
      <div className="col-span-2 mx-auto absolute top-20 right-5">
        <button
          onClick={(event) =>
            isStarClicked
              ? handleRemoveFavorite(event, encounter)
              : handleFavoriteClick(event, encounter)
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
  );
}
