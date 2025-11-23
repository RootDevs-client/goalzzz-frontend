import Countdown from '@/components/Global/Countdown';
import getSlugify from '@/lib/helpers/getSlugify';
import moment from 'moment';
import Link from 'next/link';

export default function LiveMatchCard({ match }) {
  const matchTime = match?.match_time;
  const formattedDate = moment.unix(matchTime).format('DD MMM YYYY - h:mm a');

  return (
    <div>
      <div className="bg-[#F5F5F5] -skew-y-[0.5deg] px-6 py-2">
        <h4 className="text-lg font-semibold">{match?.match_title} </h4>
        <p className="font-semibold text-xs">{formattedDate.split('-')[0]}</p>
      </div>
      <Link
        href={`/watch/live/${getSlugify(match?.team_one_name)}-vs-${getSlugify(
          match?.team_two_name
        )}/${match?.id}`}
        className="bg-[#F0F0F0] -skew-y-[0.5deg] flex items-center justify-between p-6"
      >
        <div className="flex flex-col gap-4 skew-y-[0.5deg]">
          <div className="flex items-center gap-2 ">
            <img
              src={match?.team_one_image}
              alt={match?.team_one_name}
              className="w-6 h-6 rounded-full ring-1 ring-black"
            />
            <h4 className="font-semibold">{match?.team_one_name}</h4>
          </div>
          <div className="flex items-center gap-2">
            <img
              src={match?.team_two_image}
              alt={match?.team_two_name}
              className="w-6 h-6 rounded-full ring-1 ring-black"
            />
            <h4 className="font-semibold">{match?.team_two_name}</h4>
          </div>
        </div>
        <div className="skew-y-[0.5deg]">
          <h4 className="text-sm text-end font-semibold mb-2">
            {formattedDate.split('-')[1]}
          </h4>
          <Countdown date={match?.match_time} />
        </div>
      </Link>
    </div>
  );
}
