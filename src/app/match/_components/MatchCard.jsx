import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import getShortName from '@/lib/helpers/getShortName';
import getSlugify from '@/lib/helpers/getSlugify';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import MatchStates from './MatchStates';

const MatchCard = ({ match, large }) => {
  const { token, isAdmin, user } = useAuthStore();

  const { userProfile, refetchProfile } = useGetUserProfile(
    token,
    isAdmin,
    user
  );

  const isFavorite =
    userProfile?.favorites?.matches.some(
      (item) => parseInt(item.id) === parseInt(match.id)
    ) || false;

  const [isStarClicked, setIsStarClicked] = useState(isFavorite);

  useEffect(() => {
    if (userProfile) {
      setIsStarClicked(isFavorite);
    }
  }, [isFavorite, userProfile]);

  const upcomingStatus = [
    'TBA',
    'NS',
    'WO',
    'ABANDONED',
    'CANCELLED',
    'AWARDED',
    'INTERRUPTED',
    'POSTPONED',
  ];
  const isPreviewPage = upcomingStatus.includes(match?.state?.short_name);

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
        phone: user?.phone,
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
        phone: user?.phone,
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

  const teamByLocation = (location) =>
    match?.participants?.find((team) => team?.meta?.location === location);

  return (
    <div className="relative w-full">
      <Link
        href={`/match/${isPreviewPage ? 'preview' : 'details'}/${getSlugify(
          teamByLocation('home')?.name
        )}-vs-${getSlugify(teamByLocation('away')?.name)}/${match?.id}`}
        className="w-full"
      >
        <div className="bg-base-100 h-auto w-full -skew-y-[0.5deg] mb-1">
          <div
            className={`skew-y-[0.5deg] p-2 grid grid-cols-12 items-center gap-2 ${
              large && 'p-5 px-10'
            }`}
          >
            <p className="col-span-1 text-gray-400 text-sm font-semibold">
              {match?.state?.short_name}
            </p>
            <div className="col-span-3 flex items-center">
              <img
                src={teamByLocation('home')?.image_path}
                alt="team one"
                className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
              />
              <h4 className="text-sm font-semibold uppercase">
                {getShortName(
                  teamByLocation('home')?.name,
                  teamByLocation('home')?.short_code
                )}
              </h4>
            </div>

            <MatchStates match={match} />

            <div className="col-span-4 flex items-center">
              <img
                src={teamByLocation('away')?.image_path}
                alt="team two"
                className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
              />
              <h4 className="text-sm font-semibold uppercase">
                {getShortName(
                  teamByLocation('away')?.name,
                  teamByLocation('away')?.short_code
                )}
              </h4>
            </div>
          </div>
        </div>
      </Link>

      <div className=" mx-auto absolute top-6 right-5">
        <button
          onClick={(event) =>
            isStarClicked
              ? handleRemoveFavorite(event, match)
              : handleFavoriteClick(event, match)
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
};

export default MatchCard;
