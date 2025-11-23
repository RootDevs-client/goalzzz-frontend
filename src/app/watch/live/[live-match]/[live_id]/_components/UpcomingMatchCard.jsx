import getSlugify from '@/lib/helpers/getSlugify';
import moment from 'moment';
import Link from 'next/link';

const LiveTeamCard = ({ teamImage, teamName }) => (
  <div className="flex flex-col items-center gap-2">
    <img src={teamImage} alt={teamName} className="w-14 h-full" />
    <h4 className="text-sm font-medium">{teamName}</h4>
  </div>
);

export default function UpcomingMatchCard({ match }) {
  const matchTime = match?.match_time;
  const formattedDate = moment.unix(matchTime).format('DD MMM YYYY - h:mm a');
  return (
    <Link
      href={`/watch/live/${getSlugify(match?.team_one_name)}-vs-${getSlugify(
        match?.team_two_name
      )}/${match?.id}`}
      className="relative h-36 -skew-y-[1deg] bg-base-100 p-2 mt-10"
    >
      <img
        src="/images/line-up-1.png"
        alt="bg"
        className="h-32 w-32 absolute top-1 left-1"
      />

      <img
        src="/images/line-up-2.png"
        alt="bg"
        className="h-32 w-32 absolute bottom-1 right-1"
      />
      <h4 className="text-lg absolute -top-8 skew-y-[1deg] text-black font-medium">
        {match?.match_title}
      </h4>
      <div className="grid grid-cols-3 p-4 items-center justify-items-center gap-4 h-full skew-y-[1deg]">
        <LiveTeamCard
          teamImage={match.team_one_image}
          teamName={match.team_one_name}
        />
        <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
          <p className="text-center text-white text-sm font-medium uppercase p-1">
            {formattedDate.split('-')[1]}
          </p>
        </div>
        <LiveTeamCard
          teamImage={match.team_two_image}
          teamName={match.team_two_name}
        />
      </div>
    </Link>
  );
}
