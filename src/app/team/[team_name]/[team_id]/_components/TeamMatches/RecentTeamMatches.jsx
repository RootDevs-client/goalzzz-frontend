import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import getShortName from '@/lib/helpers/getShortName';
import getSlugify from '@/lib/helpers/getSlugify';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

const MatchCard = ({ match, teamId }) => {
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

  const handleFavoriteClick = async (event, match) => {
    event.preventDefault();

    if (user) {
      setIsStarClicked(true);

      // Check if the user is an admin
      if (isAdmin) {
        toast.error('Please log in as a user to add matches to favorites');
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

  const { participants, scores, state } = match;

  const homeTeam = participants.find(
    (participant) => participant.meta.location === 'home'
  );
  const awayTeam = participants.find(
    (participant) => participant.meta.location === 'away'
  );

  // Get the current score for home and away teams
  const homeScore =
    scores.find((score) => score.participant_id === homeTeam.id)?.score.goals ||
    0;
  const awayScore =
    scores.find((score) => score.participant_id === awayTeam.id)?.score.goals ||
    0;

  const selectedTeam =
    parseInt(
      scores.find((score) => score.participant_id === parseInt(teamId))?.score
        .goals,
      10
    ) || 0;

  const otherTeam =
    parseInt(
      scores.find((score) => score.participant_id !== parseInt(teamId))?.score
        .goals,
      10
    ) || 0;

  let status;

  if (selectedTeam === otherTeam) {
    status = 'D';
  } else if (selectedTeam > otherTeam) {
    status = 'W';
  } else {
    status = 'L';
  }

  const statusStyles = {
    D: 'bg-black text-white border border-black',
    W: 'bg-green-500 text-white',
    L: 'bg-red-500 text-white',
  };

  return (
    <div className="relative w-full">
      <p>
        {moment
          .unix(match?.starting_at_timestamp)
          .local()
          .format('DD MMMM YYYY')}
      </p>
      <Link
        href={`/match/details/${getSlugify(homeTeam.name)}-vs-${getSlugify(
          awayTeam.name
        )}/${match?.id}`}
        className="w-full"
      >
        <div className={`h-auto w-full mb-1`}>
          <div className={`p-2 grid grid-cols-12 items-center gap-2`}>
            <p className="col-span-1 text-gray-400 text-sm font-semibold">
              {state?.short_name}
            </p>
            <div className="col-span-3 flex items-center">
              <img
                src={homeTeam.image_path}
                alt={homeTeam.name}
                className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
              />
              <h4 className="text-sm font-semibold uppercase">
                {getShortName(homeTeam.name, homeTeam?.short_code)}
              </h4>
            </div>

            <div
              className={`col-span-3 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex text-xs  items-center justify-center mx-auto  ${statusStyles[status]}`}
            >
              <p>{homeScore}</p>
              <p>-</p>
              <p>{awayScore}</p>
            </div>

            <div className="col-span-3 flex items-center">
              <img
                src={awayTeam.image_path}
                alt={awayTeam.name}
                className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
              />
              <h4 className="text-sm font-semibold uppercase">
                {getShortName(awayTeam.name, awayTeam?.short_code)}
              </h4>
            </div>
          </div>
        </div>
      </Link>

      <div className="col-span-2 mx-auto absolute top-12 right-5">
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

const RecentTeamMatches = ({ recentMatches, teamId }) => {
  return (
    <div className="divide-y max-w-3xl mx-auto">
      {recentMatches?.map((match) => (
        <MatchCard key={match.id} match={match} teamId={teamId} />
      ))}
    </div>
  );
};

export default RecentTeamMatches;
